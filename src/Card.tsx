import  { useEffect } from 'react';
import CardSkeleton from './CardSkeleton';
import { fetchSidoAirData, filteringAirHandler } from './store/slice/AirSlice';
import { useAppDispatch, useAppSelector } from './store/store';

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

interface CardProps {
  initialSido?: string;
  initialGugun?: string;
}

const Card = ({ initialSido, initialGugun }: CardProps) => {
  const dispatch = useAppDispatch();

  const airState = useAppSelector((state) => state.air);
  const currentAreaAirState = airState.filteredAir;

  
  useEffect(() => {
    if (!initialSido) return;
    dispatch(fetchSidoAirData(initialSido));
    dispatch(filteringAirHandler(initialGugun));
  }, []);

  return (
    <>
      {airState.status.loading ? (
        <CardSkeleton />
      ) : (
        <div
          className={`w-3/4 h-[200px] border rounded-lg  mx-auto flex items-center justify-center mt-4 flex-col gap-2 relative
    ${Number(currentAreaAirState?.khaiGrade) === 1 && 'bg-sky-600'}
    ${Number(currentAreaAirState?.khaiGrade) === 2 && 'bg-green-500'}
    ${Number(currentAreaAirState?.khaiGrade) === 3 && 'bg-yellow-600'}
    ${Number(currentAreaAirState?.khaiGrade) === 4 && 'bg-red-600'}
    ${currentAreaAirState?.khaiGrade === null && 'bg-gray-400'}
    `}
        >
          <div className="text-white flex items-baseline gap-2 absolute top-2 left-2">
            <p className="text-lg">{currentAreaAirState?.stationName}</p>
            <p className="text-xs">{currentAreaAirState?.sidoName}</p>
          </div>
          <div className="w-1/3 h-1/3 bg-white rounded-md text-2xl flex justify-center items-center mt-6">
            <span
              className={`text-4xl text-center ${
                Number(currentAreaAirState?.khaiGrade) === 1 && 'text-sky-600'
              }`}
            >
              {Number(currentAreaAirState?.khaiGrade) === 1 && '좋음'}
            </span>
            <span
              className={`text-4xl text-center ${
                Number(currentAreaAirState?.khaiGrade) === 2 && 'text-green-500'
              }`}
            >
              {Number(currentAreaAirState?.khaiGrade) === 2 && '보통'}
            </span>
            <span
              className={`text-4xl text-center ${
                Number(currentAreaAirState?.khaiGrade) === 3 &&
                'text-yellow-500'
              }`}
            >
              {Number(currentAreaAirState?.khaiGrade) === 3 && '나쁨'}
            </span>
            <span
              className={`text-center ${
                Number(currentAreaAirState?.khaiGrade) === 4 &&
                'text-red-600 text-xl'
              }`}
            >
              {Number(currentAreaAirState?.khaiGrade) === 4 && '매우 나쁨'}
            </span>
            <span
              className={` text-center ${
                currentAreaAirState?.khaiGrade === null &&
                'text-gray-400 text-xl'
              }`}
            >
              {currentAreaAirState?.khaiGrade === null && '정보 없음'}
            </span>
          </div>

          <div className="flex justify-center items-center flex-col mt-4">
            <p className="text-white text-xs">
              미세먼지 수치: {currentAreaAirState?.khaiValue}
            </p>
            <p className="text-white text-xs">
              ({currentAreaAirState?.dataTime} 기준)
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
