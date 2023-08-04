import React, { useContext } from 'react'
import YTMusicPlayer_Thumbnail from '../images/thumbnailImage/YTMusicPlayer_Thumbnail.png'
import { topLevelContext } from '../Context';
 
const ImageCard = () => {

  const {videoDetails} = useContext(topLevelContext);

  let imagePath = '';

  videoDetails.length === 0 ? imagePath = YTMusicPlayer_Thumbnail : imagePath = videoDetails.thumbnailUrl;

  return (
    <div className='absolute top-0 left-0 right-0  w-5/6 mx-auto  max-w-md  overflow-hidden'>
        <div className='rounded-2xl flex flex-col items-center justify-center  bg-cover bg-no-repeat bg-white  h-52'
        style={{backgroundImage: `url('${imagePath}')`, backgroundSize: 'cover'}}
        >
        {/* This div hold your thumbnail image */}
        </div>
      </div>
  )
}

export default ImageCard
