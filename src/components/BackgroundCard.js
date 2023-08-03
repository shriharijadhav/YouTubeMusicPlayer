import React from 'react'
 import VideoTitle from './VideoTitle';
import AudioPlayer from './AudioPlayer';
import ButtonPanel from './ButtonPanel';
 


const BackgroundCard = () => {
   return (
    <div className='flex flex-col gap-5 shadow-lg rounded-3xl p-6 w-full h-auto mt-20 bg-gray-100 dark:bg-gray-900 '>
      <VideoTitle/>  
      <AudioPlayer/> 
      <ButtonPanel/>
    </div>
  )
}

export default BackgroundCard;
