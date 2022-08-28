import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface SidoAirInfoTypes {

  // 일산화탄소 지수
  coGrade: string | null
  // 일산화탄소 농도
  coValue: string
  //  측정시간
  dataTime: string
  // 통합 대기 환경 지수
  khaiGrade: string
  // 통합 대기 환경 수치 
  khaiValue: string
  // 이산화질소 지수
  no2Grade: string
  // 이산화질소 수치 
  no2Value: string
  // 오존 지수
  o3Grade: string
  // 오존 수치
  o3Value: string
  // 아황산가스 지수
  so2Grade: string
  // 아황산가스 수치
  so2Value: string
  sidoName: string;
  stationName: string
  isLiked: boolean | null | ''
}

interface SidoAirTypes {
  sidoAirInfo: SidoAirInfoTypes[]
  status: {
    error: string | null | undefined
    loading: boolean
  }
  totalCount: number;
  filteredAir: SidoAirInfoTypes | null | undefined
  myFavoriteAir: SidoAirInfoTypes[]
  initialAir: SidoAirInfoTypes | null
}

const initialState: SidoAirTypes = {
  sidoAirInfo: [
    {
      coGrade: '',
      coValue: '',
      dataTime: '',
      khaiGrade: '',
      khaiValue: '',
      no2Grade: '',
      no2Value: '',
      o3Grade: '',
      o3Value: '',
      so2Grade: '',
      so2Value: '',
      sidoName: '',
      stationName: '',
      isLiked: null
    }],
  totalCount: 0,
  status: {
    error: '',
    loading: false
  },
  filteredAir: undefined,
  myFavoriteAir: [],
  initialAir: null
}

interface Sido { sidoAirInfo: SidoAirInfoTypes[], totalCount: number }
export const fetchSidoAirData = createAsyncThunk<Sido, string, { rejectValue: Error }>("air/getAir", async (sido, { rejectWithValue }) => {

  try {
    const responseData = await axios.get(`https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=MyXj6g1gpARPPgQt0O5yc8MpM%2FArBXMg6GONzjmVoZoIfS4dXMP3ydfWn6IASEBNUXHxiVj9KpOidOwoSWFpBw%3D%3D&returnType=json&numOfRows=200&pageNo=1&sidoName=${sido}&ver=1.0`)

    const newAir = responseData.data.response.body.items.map((item: SidoAirInfoTypes) => {
      return item = {
        ...item,
        isLiked: false
      }
    })

    const returnObj: Sido = {
      sidoAirInfo: newAir,
      totalCount: responseData.data.response.body.totalCount
    }


    return returnObj
  } catch (error) {
    const typedError = error as Error
    if (!typedError.name) {
      throw error
    }
    return rejectWithValue(typedError)
  }
})

const airSlice = createSlice({
  name: 'air',
  initialState,
  reducers: {
    filteringAirHandler(state, action) {
      if (!state.sidoAirInfo) return;
      state.filteredAir = state.sidoAirInfo.find((item) => item.stationName === action.payload)
    },
    myFavoriteAirAddHandler(state, action: PayloadAction<SidoAirInfoTypes>) {
      const currentAir = action.payload
      
      if (!currentAir) return

      state.myFavoriteAir.push({
        ...currentAir,
        isLiked: true
      })
    },
    myFavoriteAirRemoveHandler(state, action) {
      const currentAir = state.myFavoriteAir?.find((item) => item.stationName === action.payload)
      if (!currentAir) return
      currentAir.isLiked = false
      state.myFavoriteAir = state.myFavoriteAir.filter((item) => item.stationName !== currentAir.stationName)
    },
    myLocalAirHandler(state, action: PayloadAction<SidoAirInfoTypes>) {
      state.initialAir = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSidoAirData.fulfilled, (state, { payload }) => {
      state.sidoAirInfo = payload.sidoAirInfo
      state.totalCount = payload.totalCount
      state.status.loading = false;
    })
    builder.addCase(fetchSidoAirData.rejected, (state, action) => {
      state.status.error = action.error.message
      state.status.loading = false;
    })
    builder.addCase(fetchSidoAirData.pending, (state) => {
      state.status.loading = true;
    })
  }
})

export const airReducer = airSlice.reducer;
export const { filteringAirHandler, myFavoriteAirAddHandler, myFavoriteAirRemoveHandler, myLocalAirHandler } = airSlice.actions;