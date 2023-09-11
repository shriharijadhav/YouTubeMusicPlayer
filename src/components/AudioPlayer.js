import React, { useRef,  useEffect, useContext } from 'react';
import '../App.css'
import { topLevelContext } from '../Context';



const AudioPlayer = () => {

  const {videoDetails,currentIndex,setCurrentIndex,getNextUrlData,urlArray,warningToast}= useContext(topLevelContext);
      
  function hasNext(urlArray, currentIndex) {
    return currentIndex < urlArray.length - 1;
  }
 //console.log("From audio player",videoDetails.audioUrl);

  const audioRef = useRef(null);
 
  useEffect(() => {
    const audioElement = audioRef.current;

    const handleEnded = () => {
      
      // console.log('Song ended');
      // Perform any desired actions when the song ends

      // increase the pointer
      if(currentIndex === videoDetails.length-1) {
        // console.log("You have reached the end of the list of audio files")
        return null;
      }
      else{
        // check if we have any next video url or not
        if(hasNext(urlArray, currentIndex)){
          setCurrentIndex(prevCurrentIndex => prevCurrentIndex+1);
        getNextUrlData();
        }
        else{
          warningToast(`Hey, you've reached the end of the list.`);
          return null;

        }
        
      }
    };

    if(videoDetails.length !==0)
    {audioElement.addEventListener('ended', handleEnded);}
    

    return () => {
      if(videoDetails.length !==0)
    {audioElement.removeEventListener('ended', handleEnded);}
    };
    
  }, [videoDetails.length,setCurrentIndex,urlArray,currentIndex,getNextUrlData,warningToast]);

  
  

  const renderConditionalAudioTrack = () => {
    if (videoDetails.length === 0) {
      // console.log("List is empty");
      return     <audio ref={audioRef} src={''}    controlsList='nodownload' className='w-full audioBar'  controls autoPlay={true} />

    } else {
      return     <audio ref={audioRef} src={videoDetails.audioUrl}    controlsList='' className='w-full audioBar'  controls autoPlay={true} />
    }
  } 

  return (
  <div className='flex flex-col items-center justify-center w-full  '>  
  {
    renderConditionalAudioTrack()
  } 
  </div>

 

  );
};

export default AudioPlayer;
