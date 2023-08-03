import React from 'react'
import '../App.css';



const PlaylistItemFinal = ({gradientClass,heading,headingTwo,topSinger,handlePlaylistSuggestionCLick,index}) => {
  return (
    <div className={`h-60 w-60 mx-auto rounded-2xl shadow-lg shadow-gray-600  my-5 flex flex-col justify-center items-center px-4 ${gradientClass}`} onClick={()=>{handlePlaylistSuggestionCLick(index)}} >
      <div className='text-2xl text-gray-200  font-bold my-2 flex flex-row w-full justify-center items-center '>{heading}</div>
      <div className='text-2xl text-gray-200  font-bold my-2 flex flex-row w-full justify-center items-center '>{headingTwo}</div>
      <div className='text-lg text-gray-300 my-2'>{topSinger}</div>
    </div>
  )
}

export default PlaylistItemFinal;
