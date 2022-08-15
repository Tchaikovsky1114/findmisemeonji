import { useEffect, useRef, useState } from "react"
import Card from "./Card"
import CardSkeleton from "./CardSkeleton"
import Select from "./Select"
import { fetchSidoAirData, filteringAirHandler } from "./store/slice/AirSlice"
import BottomNavigation from "./BottomNavigation"
import { useAppDispatch, useAppSelector } from "./store/store"
import ViewAllCard from "./ViewAllCard"
import InitialMyLocal from "./InitialMyLocal"

function App() {
  const viewState = useAppSelector(state => state.view)
  const airState = useAppSelector(state => state.air)
  const [appStart,setAppStart] = useState(false)
  console.log(airState.sidoAirInfo)
  console.log(viewState.viewAll);
  return (
    <>
    {!appStart && <InitialMyLocal setAppStart={setAppStart} /> }

    {appStart && 
    <>
      <Select />

        
        { viewState.viewSelected && <Card /> }

        {viewState.viewAll &&
          airState.sidoAirInfo.map((sido) => (
          <ViewAllCard
          key={sido.stationName}
          khaiGrade={sido.khaiGrade}
          stationName={sido.stationName}
          sidoName={sido.sidoName}
          khaiValue={sido.khaiValue}
          dataTime={sido.dataTime}
          fullInfo={sido}
          />
          ))
        }

        {
          viewState.favorites &&
          airState.myFavoriteAir.map((sido) => (
          <ViewAllCard
          key={sido.stationName}
          khaiGrade={sido.khaiGrade}
          stationName={sido.stationName}
          sidoName={sido.sidoName}
          khaiValue={sido.khaiValue}
          dataTime={sido.dataTime}
          fullInfo={sido}
          />
          )) 
        }
        <BottomNavigation setAppStart={setAppStart} />
        </>}
        
    </>
  )
}

export default App
