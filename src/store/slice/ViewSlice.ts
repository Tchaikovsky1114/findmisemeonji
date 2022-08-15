import { createSlice } from "@reduxjs/toolkit";


interface viewInitialStateTypes {
  viewAll : boolean
  favorites: boolean
  viewSelected:boolean
  myLocal : boolean
}

const initialState:viewInitialStateTypes = {
  viewAll : false,
  favorites: false,
  viewSelected:false,
  myLocal : true
}

export const viewSlice = createSlice({
  name:'view',
  initialState,
  reducers: {
    myLocalHandler(state) {
      state.viewAll = false;
      state.favorites = false;
      state.viewSelected = false;
      state.myLocal = true;
    },
    viewAllHandler(state) {
      state.viewAll = true;
      state.favorites = false;
      state.viewSelected = false;
      state.myLocal = false;
    },
    favoritesHandler(state) {
      state.viewAll = false;
      state.favorites = true;
      state.viewSelected = false;
      state.myLocal = false;
    },
    viewSelectedOneHandler(state) {
      state.viewAll = false;
      state.favorites = false;
      state.viewSelected = true;
      state.myLocal = false;
    },

  }
})

export const viewReducer = viewSlice.reducer;
export const {myLocalHandler,viewAllHandler,favoritesHandler,viewSelectedOneHandler} = viewSlice.actions
