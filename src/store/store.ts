import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { airReducer } from "./slice/AirSlice"
import { viewReducer } from "./slice/ViewSlice"


export const store = configureStore({
  reducer: {
    air: airReducer,
    view: viewReducer
  }
})

type RootState = ReturnType<typeof store.getState>
type AppDispath = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispath>();
