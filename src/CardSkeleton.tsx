import React from 'react';

const CardSkeleton = () => {
  return (
    <div className='absolute z-20 left-1/2 top-[28%] -translate-x-1/2 -translate-y-1/2 overflow-hidden isolate shadow-xl shadow-black/5 before:border-t before:border-rose-100/10'>
    <div className='before:absolute before:inset-0 before:-translate-x-full before: animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent'></div>
      <div className= 'z-50 absolute w-full  py-96 bg-gradient-to-r from-transparent via-rose-100/50 to-transparent animate-shimmer -translate-x-full'>{' '}</div>
        <div className="relative w-72 h-[200px] space-y-5 rounded-2xl  p-4 bg-slate-600 opacity-70">
          <div className='flex justify-start gap-2'>
        <div className=" h-3 w-2/5 rounded-lg bg-rose-100/10 p-2"></div>
        <div className=" h-3 w-1/5 rounded-lg bg-rose-100/10 p-2"></div>
        </div>
        <div>
          <div className='bg-rose-100/20 h-16 w-2/5 mx-auto rounded-lg'></div>
          <div className='flex flex-col justify-center items-center mt-6 gap-2'>
          <div className=" h-3 w-2/5 rounded-lg bg-rose-100/10 p-1"></div>
          <div className=" h-3 w-3/5 rounded-lg bg-rose-100/10 p-1"></div>
          </div>
        </div>
          </div>
        
      </div>
  );
};

export default CardSkeleton;