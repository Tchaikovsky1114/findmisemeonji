import  { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faFilledStar } from '@fortawesome/free-solid-svg-icons';

import {
  myFavoriteAirAddHandler,
  myFavoriteAirRemoveHandler,
  SidoAirInfoTypes,
} from './store/slice/AirSlice';
import { useAppDispatch, useAppSelector } from './store/store';
interface ViewAllCardProps {
  khaiGrade: string;
  stationName: string;
  sidoName: string;
  khaiValue: string;
  dataTime: string;
  fullInfo: SidoAirInfoTypes;
}

const ViewAllCard = ({
  khaiGrade,
  stationName,
  sidoName,
  khaiValue,
  dataTime,
  fullInfo,
}: ViewAllCardProps) => {
  const airState = useAppSelector((state) => state.air);
  const dispatch = useAppDispatch();

  const myFavoritesAddHandler = useCallback(() => {
    dispatch(myFavoriteAirAddHandler(fullInfo));
  },[fullInfo]);


  const myFavoritesRemoveHandler = useCallback(() => {
    dispatch(myFavoriteAirRemoveHandler(stationName));
  },[stationName]);


  const airFound = airState.myFavoriteAir.find(
    (item) => item.stationName === fullInfo.stationName
  );
  
  return (
    <div
      className={`w-3/4 h-[200px] border rounded-lg  mx-auto flex items-center justify-center mt-4 flex-col gap-2 relative
    ${Number(khaiGrade) === 1 && 'bg-sky-600'}
    ${Number(khaiGrade) === 2 && 'bg-green-500'}
    ${Number(khaiGrade) === 3 && 'bg-yellow-600'}
    ${Number(khaiGrade) === 4 && 'bg-red-600'}
    ${khaiGrade === null && 'bg-gray-400'}
    `}
    >
      <div className="text-white flex flex-row justify-between items-center w-full px-4">
        <div className="flex justify-items-start items-baseline gap-1">
          <p className="text-lg">{stationName}</p>
          <p className="text-xs">{sidoName}</p>
        </div>
        <div>
          {!airFound?.isLiked && (
            <FontAwesomeIcon
              icon={faStar}
              size="lg"
              onClick={myFavoritesAddHandler}
            />
          )}
          {airFound?.isLiked && (
            <FontAwesomeIcon
              icon={faFilledStar}
              size="lg"
              onClick={myFavoritesRemoveHandler}
            />
          )}
        </div>
      </div>
      <div className="w-1/3 h-1/3 bg-white rounded-md text-2xl flex justify-center items-center mt-6">
        <span
          className={`text-4xl text-center ${
            Number(khaiGrade) === 1 && 'text-sky-600'
          }`}
        >
          {Number(khaiGrade) === 1 && '좋음'}
        </span>
        <span
          className={`text-4xl text-center ${
            Number(khaiGrade) === 2 && 'text-green-500'
          }`}
        >
          {Number(khaiGrade) === 2 && '보통'}
        </span>
        <span
          className={`text-4xl text-center ${
            Number(khaiGrade) === 3 && 'text-yellow-500'
          }`}
        >
          {Number(khaiGrade) === 3 && '나쁨'}
        </span>
        <span
          className={`text-center ${
            Number(khaiGrade) === 4 && 'text-red-600 text-xl'
          }`}
        >
          {Number(khaiGrade) === 4 && '매우 나쁨'}
        </span>
        <span
          className={` text-center ${
            khaiGrade === null && 'text-gray-400 text-xl'
          }`}
        >
          {khaiGrade === null && '정보 없음'}
        </span>
      </div>

      <div className="flex justify-center items-center flex-col mt-4">
        <p className="text-white text-xs">미세먼지 수치: {khaiValue}</p>
        <p className="text-white text-xs">({dataTime} 기준)</p>
      </div>
    </div>
  );
};

export default ViewAllCard;
