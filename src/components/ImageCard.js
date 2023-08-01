import React from 'react'
import YTMusicPlayer_Thumbnail from '../images/thumbnailImage/YTMusicPlayer_Thumbnail.png'
 
const ImageCard = ({videoDetails}) => {

  let imagePath = '';

  videoDetails.length === 0 ? imagePath = YTMusicPlayer_Thumbnail : imagePath = videoDetails.thumbnailUrl;

  return (
    <div className='absolute top-0 left-0 right-0  w-5/6 mx-auto  max-w-md '>
        <div className=' shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center bg-white    h-52'
        style={{backgroundImage: `url('${imagePath}')`,backgroundSize:'cover'}}
        >
        {/* This div hold your thumbnail image */}
        </div>
      </div>
  )
}

export default ImageCard
