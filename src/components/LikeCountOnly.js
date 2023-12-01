import React, { useContext, useEffect, useState } from 'react'
import NumberCounter from 'number-counter';
import { topLevelContext } from '../Context';

import heartIcon from '../images/logo/heart.svg';
import { GET_TOTAL_LIKES_COUNT } from '../services/apis';
import { apiConnector } from '../services/apiConnector';

function LikeCountOnly() {
    const { setIsLikeBtnClicked,increaseLikesCount,totalLikesCount,setIsLoadingForStats,setTotalLikesCount,isLikeBtnClicked} = useContext(topLevelContext);

    const [isClicked, setIsClicked] = useState(false);
    
  const handleClick = () => {
    increaseLikesCount();
    // console.log('handleClick')
    setIsClicked(true);
    setIsLikeBtnClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 200); // Adjust the duration of the animation
  };

  useEffect(() => {
    const getSubsequentLikes = async () =>{
        try {
            setIsLoadingForStats(true);
            const response = await apiConnector('get', GET_TOTAL_LIKES_COUNT.formattedUrl, null,null, null);
          
            const data = response.data;
            setTotalLikesCount(data.totalLikesCount);
            setIsLoadingForStats(false);
            setIsLikeBtnClicked(false);
           } catch (error) {
            
           }
         // console.log(data)
       }

       if (isLikeBtnClicked) {
        getSubsequentLikes();
       }
  
    return () => {
       
    }
  }, [ isLikeBtnClicked])
  

  return (
   < >
   <div className='  mt-8 flex flex-col justify-center items-center gap-3  text-xl font-bold bg-gradient-to-tr from-purple-500 via-indigo-500 to-indigo-700 text-transparent bg-clip-text'>
   <div className='pb-1 text-3xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-indigo-700 text-transparent bg-clip-text '>
   <NumberCounter end={totalLikesCount} delay={1.5}/>

   </div>

   <p >Total Likes</p>
   </div>
   <div className=' flex  flex-col justify-center items-center gap-1 text-xl font-bold bg-gradient-to-tr from-purple-500 via-indigo-500 to-indigo-700 text-transparent bg-clip-text'>
   <div className='  flex flex-col w-full justify-center items-center gap-2 '>
   <p className={`${isClicked ? 'plusOneVisible' : 'plusOneHidden'}`}
   >+1</p>
   <img
   src={heartIcon } alt='hearts'
   className={`clickable-image ${isClicked ? 'clicked' : ''}`}
   onClick={handleClick}
   width={40} height={40} id='heartImg'
   />
   
   </div>
   <p >Give more Likes</p>
   </div>
   </>
  )
}

export default LikeCountOnly
