import React from 'react'
 const QueueStatus = ({urlArray,currentIndex}) => {

 
let displayIndex = null;

currentIndex +1 > urlArray.length ? displayIndex =urlArray.length : displayIndex = currentIndex + 1;
 
  return (
    <div className=' cursor-pointer bg-indigo-400 -mt-10 w-full -z-10 h-20 rounded-3xl  flex-wrap overflow-hidden pb-2 px-5 relative flex flex-row justify-center items-end'>
        <h1 className='text-gray-200 text-base'>Playlist status :{` ${displayIndex}/${urlArray.length}`} </h1>
    </div>
  )
}

export default QueueStatus
