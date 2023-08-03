import React, { useContext } from 'react'
import { topLevelContext } from '../Context';

const VideoTitle = () => {

  const {videoDetails} = useContext(topLevelContext);
  let titleForVideo = '';


  videoDetails.length === 0 ? titleForVideo = 'Youtube Music Player' : titleForVideo = videoDetails.videoTitle;
  return (
    <div className='mt-32 px-5'>
    <h2 className='text-xl font-bold text-indigo-500 '>{`${titleForVideo}`}  </h2>
     </div>
    
  )
}

export default VideoTitle
