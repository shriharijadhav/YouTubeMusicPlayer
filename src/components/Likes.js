

import React, { useContext, useEffect, useState } from 'react';
import '../App.css';
import { topLevelContext } from '../Context';
import heartIcon from '../images/logo/heart.svg';
import '../css/heartButton.css'
import LoaderForStats from './LoaderForStats';
 import NumberCounter from 'number-counter';
import { GET_TOTAL_LIKES_COUNT, GET_TOTAL_SONGS_PLAYED } from '../services/apis';
import { apiConnector } from '../services/apiConnector';
import LikeCountOnly from './LikeCountOnly';
 
import { databases } from '../appwrite/appwriteConfig'

 

function Likes() {
  
  // const {stats} = useContext(topLevelContext);
  const {totalSongsPlayed }  = useContext(topLevelContext);
   
   const{isLoadingForStats} = useContext(topLevelContext);
  // console.log(isLoadingForStats)
  const [isClicked, setIsClicked] = useState(false);

  const {setOpenModalForLikes} = useContext(topLevelContext);
  // const {increaseLikesCount} = useContext(topLevelContext);
  const {fetchAllStats } = useContext(topLevelContext);


    // to fetch data from appwrite database



    
     
    // ends here 

 

  
   
return (
  <div className='modalBackground '>
    <div className='modalContainer ScrollBarForHelp  dark:bg-gray-400 bg-indigo-300 dark:text-indigo-900 text-indigo-900 w-10/12 sm:w-10/12 md:w-7/12 lg:w-7/12 xl:w-7/12 mx-auto flex flex-col gap-5 z-50 p-10 rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
  
       <div className='flex flex-row  w-full justify-end items-center border-b-2 p-3 md:px-10 lg:px-1 '>
          <div className='flex flex-row w-full justify-between  items-center text-xl dark:text-indigo-900 md:px-2 '>
          <div className='text-xl font-bold'>Statistics </div>
          <div className='text-xl cursor-pointer'onClick={()=>setOpenModalForLikes(false)} title='close'>X</div>
          </div>
           

           </div>
      {
        isLoadingForStats?
        (<LoaderForStats />)
        :(
          <div className='px-0 md:px-10 lg:px-10 max-h-96 overflow-hidden ScrollBarForHelp my-3 mt-2 '>
                    
          <div className='py-5 flex flex-col lg:flex-row  gap-5  w-11/12  justify-between items-center h-full'>
          <div className='mt-8 flex flex-col justify-center items-center gap-3 text-xl font-bold bg-gradient-to-tr from-purple-500 via-indigo-500 to-indigo-700 text-transparent bg-clip-text'>
              <div className=' text-3xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-indigo-700 text-transparent bg-clip-text '>
              <NumberCounter end={totalSongsPlayed} delay={1.5}/>
 
              </div>

          <p >Total Songs Played </p>
          </div>  
              <LikeCountOnly/> 
          </div>
          
           
          
          </div>
        )
       }
    </div>
  </div>
);

}

export default Likes
