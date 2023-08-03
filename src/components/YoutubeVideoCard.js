import React, {useContext, useState} from 'react';
import done from '../images/done.svg';
import { topLevelContext } from '../Context';
 
const YoutubeVideoCard = ({ title, thumbnailUrl ,channelName,videoId}) => {

  const {successToast,urlArray,setUrlArray} = useContext(topLevelContext);
    const tempVideoTitle = title ? title :` `;
    const tempVideoTitleThumbnailUrl = thumbnailUrl ? thumbnailUrl :` `;
 
   const [addedVideoIds, setAddedVideoIds] = useState([]);


   const handleClick = (videoId) => {
    try {
      // console.log(videoId);
      let formattedUrlFromParams = `https://www.youtube.com/watch?v=${videoId}`;
      // console.log(formattedUrlFromParams);
      setAddedVideoIds(addedVideoIds.concat(videoId));
  
      // const tempArray = [...addedVideoIds, formattedUrlFromParams];
      setUrlArray([...urlArray, formattedUrlFromParams]);
      // console.log('url array', urlArray); 
      successToast('Item has been added to the playlist 🤩');
    } catch (error) {
      
    }
   
  };


  return (
    <div className='w-full rounded-2xl overflow-hidden gap-1 justify-center items-center bg-gray-200 shadow-lg flex flex-col md:flex-row lg:flex-row py-3 pr-2'>
    <div className='flex flex-row  justify-center items-center w-full md:w-2/6  rounded-xl overflow-hidden'>
    <img src={tempVideoTitleThumbnailUrl} alt={`title`} className='w-50 h-32 object-fill rounded-xl overflow-hidden' />

    </div>     
     <div className='  flex flex-col md:flex-row w-full md:w-4/6 px-1 py-2  overflow-x-hidden overflow-y-hidden justify-between whitespace-normal '>
      <div className='flex flex-col px-2 w-full md:w-10/12'>
        
        <p className='w-full   font-medium py-1'>  {tempVideoTitle}</p>
         <p className='text-gray-700 py-1 w-full font-medium'>{channelName}</p>
      </div>
      <div className='flex flex-row w-full md:w-2/12 justify-center items-center md:pr-5'>
      {!addedVideoIds.includes(videoId) ? (
        <button className='flex justify-center items-center h-10 w-10 bg-indigo-400 rounded-lg text-lg font-bold text-white' onClick={()=>{handleClick(videoId)}} >+</button>
        ) : (
          <div className='flex justify-center items-center h-10 w-10 rounded-lg text-lg font-bold text-white' >
          <img src={done} alt={`Added`} className='h-10 w-10 object-fill rounded-xl overflow-hidden' />
          </div>
          )
      }

      </div>
    </div>
  </div>
  );
};

export default YoutubeVideoCard;
