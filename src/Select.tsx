import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from './store/store';
import { fetchSidoAirData, filteringAirHandler } from './store/slice/AirSlice';
import { viewSelectedOneHandler } from './store/slice/ViewSlice';

// grade 1 좋음 2 보통 3 나쁨 4 매우 나쁨
interface SidoAirTypes {
  // 일산화탄소 지수
  coGrade: string | null;
  // 일산화탄소 농도
  coValue: string;
  //  측정시간
  dataTime: string;
  // 통합 대기 환경 지수
  khaiGrade: string;
  // 통합 대기 환경 수치
  khaiValue: string;
  // 이산화질소 지수
  no2Grade: string;
  // 이산화질소 수치
  no2Value: string;
  // 오존 지수
  o3Grade: string;
  // 오존 수치
  o3Value: string;
  // 아황산가스 지수
  so2Grade: string;
  // 아황산가스 수치
  so2Value: string;
  sidoName: string;
  stationName: string;
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

const Select = () => {
  const dispatch = useAppDispatch();
  const airState = useAppSelector((state) => state.air);
  const [sido, setSido] = useState('');
  const [gugun, setGugun] = useState('');

  const selectSidoHandler = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSidoName = e.currentTarget.value;
    setSido(selectedSidoName);
    dispatch(fetchSidoAirData(selectedSidoName));
  };
  const selectGugunHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedGugunName = e.currentTarget.value;
    setGugun(selectedGugunName);
    const {
      currentTarget: { value },
    } = e;
    dispatch(filteringAirHandler(value));
    dispatch(viewSelectedOneHandler());
  };

  return (
    <div className="">
      <div className="flex flex-col justify-center items-center gap-4 mt-4">
        <div>
          <select
            className="p-4 border border-indigo-500 rounded-tl-lg rounded-bl-lg appearance-none mr-1 text-center font-bold bg-rose-100/50 min-w-[80px]"
            name="시도"
            onChange={selectSidoHandler}
            value={sido}
          >
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
            value={gugun}
          >
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
        {airState.totalCount ? (
          <p className="text-rose-400 text-xs">
            {airState.totalCount}개의 검색 결과
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Select;
