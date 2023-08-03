import React  from 'react';
import '../css/loader.css';
 
const Loader = () => {
  
  return (
    <div className='flex flex-row w-full h-screen justify-center items-center text-gray-300 bg-gray-700 '>
    <div className='mx-auto w-10/12  flex flex-col h-full justify-center items-center  gap-36'>
    <div className='text-gray-100 dark:text-gray-400 text-lg px-7'>Please refresh in case you see this loader for long time</div>
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
  )
}

export default Loader
