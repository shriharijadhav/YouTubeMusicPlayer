import React from 'react'
 import VideoTitle from './VideoTitle';
import AudioPlayer from './AudioPlayer';
import ButtonPanel from './ButtonPanel';



const BackgroundCard = ({getPreviousItem,getNextItem,clearList, urlArray,currentIndex ,setCurrentIndex,videoDetails,getNextUrlData,warningToast,getShuffledUrlData,handleModalOpen}) => {
  return (
    <div className='flex flex-col gap-5 shadow-lg rounded-3xl p-6 w-full h-auto mt-20 bg-gray-100 dark:bg-gray-900 '>
       <VideoTitle videoDetails={videoDetails} currentIndex={currentIndex} />  
        <AudioPlayer warningToast={warningToast} urlArray={urlArray} videoDetails={videoDetails} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} getNextUrlData={getNextUrlData}/> 
  
  <ButtonPanel  handleModalOpen={handleModalOpen} urlArray={urlArray} getShuffledUrlData={getShuffledUrlData} getNextItem={getNextItem} clearList={clearList} getPreviousItem={getPreviousItem} />
      </div>
  )
}

export default BackgroundCard


/*
<div className='flex flex-row w-full bg-red-200 justify-center items-center mx-auto'>
    <button
      className=' w-10 h-10'
       >
    <img src={left} alt='pausebutton' className='w-full h-full object-cover' />
    </button>

    
      <button
        className=' w-10 h-10'
        onClick={togglePlayback}
      >
        {isPlaying ? (
            <img src={pauseButton} alt='pausebutton' className='w-full h-full object-cover' />
        ) : (
            <img  src={playButton} alt='playbutton' className='w-full h-full object-cover' />

        )}
      </button>
      
      <button
      className=' w-10 h-10'
      >
    <img src={rightArrow} alt='pausebutton' className='w-full h-full object-cover' />
    </button>
    </div>
*/