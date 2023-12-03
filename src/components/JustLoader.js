import React from 'react'
import '../css/justloader.css';

const JustLoader = () => {
  return (
    <div>
    <div className='flex flex-row max-w-md h-1/2 justify-center items-center  bg-transparent  '>
    <div className='mx-auto w-1/2  flex flex-col h-1/2 justify-center items-center gap-5 py-5 '>
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

export default JustLoader
