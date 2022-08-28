import React, { useCallback } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLocationDot,faMapLocationDot, faStar, } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch } from './store/store';
import { favoritesHandler, viewAllHandler } from './store/slice/ViewSlice';

interface BottomNavigationProps {
  setAppStart: React.Dispatch<React.SetStateAction<boolean>>
}

const BottomNavigation = ({setAppStart}:BottomNavigationProps) => {
  const dispatch = useAppDispatch()

  const myLocalClickHandler = useCallback(() => {
    setAppStart(false)
  },[])

  const viewAllClickHandler = useCallback(() => {
    dispatch(viewAllHandler())
  },[])

  const favoritesClickHandler = useCallback(() => {
    dispatch(favoritesHandler())
  },[])
  
  return (
    <>
      <div className='fixed bottom-0 w-full flex justify-between items-center px-4  border-2 border-transparent shadow-lg border-t-gray-400/40 h-16'>
        <button className='flex flex-col justify-center items-center' onClick={myLocalClickHandler}><FontAwesomeIcon icon={faLocationDot} size="lg" /> <p className="text-xs font-bold pt-2">내 지역보기</p></button>
        <button className='flex flex-col justify-center items-center' onClick={viewAllClickHandler}><FontAwesomeIcon icon={faMapLocationDot} size="lg" /><p className="text-xs font-bold pt-2">전체 시도보기</p></button>
        <button className='flex flex-col justify-center items-center' onClick={favoritesClickHandler}><FontAwesomeIcon icon={faStar} size="lg" /><p className="text-xs font-bold pt-2">즐겨 찾기</p></button>
      </div>
    </>
  );
};

export default BottomNavigation;