import React  from 'react';
import './loader.css';
 
const LoaderForOfflineUser = () => {
  
  return (
    <div className='flex flex-row w-full h-screen justify-center items-center text-gray-300 bg-gray-700 '>
    <div className='mx-auto w-10/12  flex flex-col h-full justify-center items-center  gap-16'>
    <div className='text-gray-100 dark:text-gray-400 text-lg px-7'>Dear User, we truly believe that together we can make the sweetest experience!</div>
    <div className='text-gray-100 dark:text-gray-400 text-lg px-7'>Unfortunately, it seems that we're currently not connected to the delightful world of the internet. </div>
      <div className='loader'>
      <div className='stroke bg-indigo-500 dark:bg-indigo-400'></div>
      <div className='stroke bg-indigo-500 dark:bg-indigo-400'></div>
      <div className='stroke bg-indigo-500 dark:bg-indigo-400'></div>
      <div className='stroke bg-indigo-500 dark:bg-indigo-400'></div>
      <div className='stroke bg-indigo-500 dark:bg-indigo-400'></div>
      <div className='stroke bg-indigo-500 dark:bg-indigo-400'></div>
      <div className='stroke bg-indigo-500 dark:bg-indigo-400'></div>
      <div className='stroke bg-indigo-500 dark:bg-indigo-400'></div>
      </div>
      <div className='text-gray-100 dark:text-gray-400 text-lg px-7'>Your internet connection is lost ! </div>

    </div>
    
    </div>
  )
}

export default LoaderForOfflineUser;
