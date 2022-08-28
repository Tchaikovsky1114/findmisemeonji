import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  fetchSidoAirData,
  filteringAirHandler,
  myLocalAirHandler,
  
} from './store/slice/AirSlice';

import { useAppDispatch, useAppSelector } from './store/store';

interface InitialMyLocalProps {
  setAppStart: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidoNameArray = [
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '경기',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
  '세종',
];

const InitialMyLocal = ({ setAppStart }: InitialMyLocalProps) => {
  const dispatch = useAppDispatch();
  const airState = useAppSelector((state) => state.air);
  const initialAir = airState.initialAir;
  const [initialSido, setInitialSido] = useState(
    initialAir?.sidoName || '시/도'
  );
  const [initialGugun, setInitialGugun] = useState(
    initialAir?.stationName || '세부지역'
  );

  const selectSidoHandler =  useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSidoName = e.currentTarget.value;
    setInitialSido(selectedSidoName);
    dispatch(fetchSidoAirData(selectedSidoName));
  },[initialSido]);

  const selectGugunHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const selectedGugunName = e.currentTarget.value;
    setInitialGugun(selectedGugunName);
    const {
      currentTarget: { value },
    } = e;
    dispatch(filteringAirHandler(value));
  },[initialGugun]);

  const appStartHandler = useCallback(() => {
    if (initialSido === '시/도' || initialGugun === '세부지역') return;
    setAppStart(true);
  },[initialSido,initialGugun]);

  useEffect(() => {
    const initialAir = airState.sidoAirInfo.find(
      (item) => item.stationName === initialGugun
    );
    if (!initialAir) return;
    dispatch(myLocalAirHandler(initialAir));
  }, [initialGugun]);

  return (
    <>
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
        <div className="flex flex-col justify-center items-center gap-4 mt-4">
          <p className="font-bold"> 기본지역 설정하기</p>
          <div>
            <select
              className="p-4 border border-indigo-500 rounded-tl-lg rounded-bl-lg appearance-none mr-1 text-center font-bold bg-rose-100/50 min-w-[80px]"
              name="시도"
              onChange={selectSidoHandler}
              value={initialSido}
            >
              <option value="시도">시/도</option>
              {SidoNameArray.map((item, index) => (
                <option
                  className="text-center text-xs font-bold"
                  value={item}
                  key={item + index}
                >
                  {item}
                </option>
              ))}
            </select>
            <select
              className="p-4 border border-indigo-500 rounded-tr-lg rounded-br-lg appearance-none text-center font-bold bg-teal-100/50 min-w-[180px]"
              name="구/군"
              onChange={selectGugunHandler}
              value={initialGugun}
            >
              <option value="">세부지역</option>
              {airState.sidoAirInfo.map((item) => (
                <option
                  className="text-center text-xs font-bold"
                  key={item.stationName}
                  value={item.stationName}
                >
                  {item.stationName}
                </option>
              ))}
            </select>
          </div>
        </div>
        {initialAir && (
          <div
            className={`w-3/4 h-[200px] border rounded-lg  mx-auto flex items-center justify-center mt-4 flex-col gap-2 relative
    ${Number(initialAir.khaiGrade) === 1 && 'bg-sky-600'}
    ${Number(initialAir.khaiGrade) === 2 && 'bg-green-500'}
    ${Number(initialAir.khaiGrade) === 3 && 'bg-yellow-600'}
    ${Number(initialAir.khaiGrade) === 4 && 'bg-red-600'}
    ${initialAir.khaiGrade === null && 'bg-gray-400'}`}
          >
            <div className="text-white flex items-baseline gap-2 absolute top-2 left-2">
              <p className="text-lg">{initialAir.stationName}</p>
              <p className="text-xs">{initialAir.sidoName}</p>
            </div>

            <div className="w-1/3 h-1/3 bg-white rounded-md text-2xl flex justify-center items-center mt-6">
              <span
                className={`text-4xl text-center ${
                  Number(initialAir.khaiGrade) === 1 && 'text-sky-600'
                }`}
              >
                {Number(initialAir.khaiGrade) === 1 && '좋음'}
              </span>
              <span
                className={`text-4xl text-center ${
                  Number(initialAir.khaiGrade) === 2 && 'text-green-500'
                }`}
              >
                {Number(initialAir.khaiGrade) === 2 && '보통'}
              </span>
              <span
                className={`text-4xl text-center ${
                  Number(initialAir.khaiGrade) === 3 && 'text-yellow-500'
                }`}
              >
                {Number(initialAir.khaiGrade) === 3 && '나쁨'}
              </span>
              <span
                className={`text-center ${
                  Number(initialAir.khaiGrade) === 4 && 'text-red-600 text-xl'
                }`}
              >
                {Number(initialAir.khaiGrade) === 4 && '매우 나쁨'}
              </span>
              <span
                className={` text-center ${
                  initialAir.khaiGrade === null && 'text-gray-400 text-xl'
                }`}
              >
                {initialAir.khaiGrade === null && '정보 없음'}
              </span>
            </div>

            <div className="flex justify-center items-center flex-col mt-4">
              <p className="text-white text-xs">
                미세먼지 수치: {initialAir.khaiValue}
              </p>
              <p className="text-white text-xs">({initialAir.dataTime} 기준)</p>
            </div>
          </div>
        )}
        <div className="mt-8">
          <button
            className="w-full p-2 text-center bg-rose-600 text-white font-bold"
            onClick={appStartHandler}
          >
            시작하기
          </button>
        </div>
      </div>
    </>
  );
};

export default InitialMyLocal;
