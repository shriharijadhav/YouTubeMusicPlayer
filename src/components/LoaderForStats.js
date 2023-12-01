import React from 'react'
import '../css/loader.css';

const LoaderForStats = () => {
  return (
    <div>
    <div className='flex flex-row max-w-full h-full justify-center items-center  bg-transparent  '>
    <div className='mx-auto w-full  flex flex-col h-full justify-center items-center gap-5 py-5 '>
    <div className='text-gray-100 dark:text-indigo-900 text-base px-7'>Hold on a moment, data is on its way to enlighten your screen!</div>
      <div className='loader'>
      <div className='stroke bg-indigo-500 dark:bg-indigo-400'></div>
      <div className='stroke bg-indigo-500 dark:bg-indigo-400'></div>
      <div className='stroke bg-indigo-500 dark:bg-indigo-400'></div>
      <div className='stroke bg-indigo-500 dark:bg-indigo-400'></div>
      <div className='stroke bg-indigo-500 dark:bg-indigo-400'></div>
      <div className='stroke bg-indigo-500 dark:bg-indigo-400'></div>
      <div className='stroke bg-indigo-500 dark:bg-indigo-400'></div>

      </div>
    </div>
    
    </div>
    </div>
  )
}

export default LoaderForStats
