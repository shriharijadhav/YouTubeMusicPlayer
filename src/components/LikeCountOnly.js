import React, { useContext, useEffect, useState } from 'react'
import NumberCounter from 'number-counter';
import { topLevelContext } from '../Context';

import heartIcon from '../images/logo/heart.svg';


import { databases } from '../appwrite/appwriteConfig'
 import JustLoader from './JustLoader';
import { Permission, Role } from 'appwrite';


function LikeCountOnly() {

    const [tempFlagForLikesCount,setTempFlagForLikesCount] = useState(false);




    const { setIsLikeBtnClicked,totalLikesCount,setIsLoadingForStats,setTotalLikesCount,isLikeBtnClicked} = useContext(topLevelContext);
    const [dummyLikesCount,setDummyLikesCount] = useState(totalLikesCount);
    const [isClicked, setIsClicked] = useState(false);
    
  const handleClick = () => {
     
    setIsClicked(true);
    setIsLikeBtnClicked(true);
 
    setTimeout(() => {
      setIsClicked(false);
    }, 200); // Adjust the duration of the animation
  };



  
  
  useEffect(() => {
    
    const increaseLikesCountDummy= async () =>{
        
        // check if details are empty
        if (totalLikesCount === 0 || totalLikesCount === undefined) {
            // console.log('blank value ')
        } else {
             
            const promise = databases.updateDocument('6569f1688ba2c663cce5','6569f1933cac91c8b4ce','656c0a400d528ba40371',{totallikes:totalLikesCount+1},[Permission.read(Role.any())]     );
        
            //    console.log(promise);
               promise.then(
                function(response){
                    // console.log('value-1',response);
                    setDummyLikesCount(response.totallikes)
                    setIsLikeBtnClicked(false);
                    setTempFlagForLikesCount(true);
                },
                function(err){
                    // errorToast(`Error : ${err.message}`);
                }
               )
          }
     
          setTotalLikesCount(dummyLikesCount);

        }
        if (isLikeBtnClicked) {
            increaseLikesCountDummy();
          }
    
  
  
    return () => {
       
    }
  }, [isLikeBtnClicked])
  

  return (
    <>
   {
    isLikeBtnClicked?(<JustLoader/>):(< >
        <div className='  mt-8 flex flex-col justify-center items-center gap-3  text-xl font-bold bg-gradient-to-tr from-purple-500 via-indigo-500 to-indigo-700 text-transparent bg-clip-text'>
        <div className='pb-1 text-3xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-indigo-700 text-transparent bg-clip-text '>
        <NumberCounter end={dummyLikesCount} delay={1.5}/>
     
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
        </>)
   }

    </>
  )
}

export default LikeCountOnly
