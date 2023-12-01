import React, { useContext, useState } from 'react'
 import heartIcon from '../images/logo/heart.svg';
import { topLevelContext } from '../Context';
import NumberCounter from 'number-counter';


function TempForStats({stats}) {
    const [isClicked, setIsClicked] = useState(false);
    const {increaseLikesCount} = useContext(topLevelContext);

    const handleClick = () => {
        increaseLikesCount();
        console.log('handleClick')
        setIsClicked(true);
    
        setTimeout(() => {
          setIsClicked(false);
        }, 200); // Adjust the duration of the animation
      };
  return (
    <div className='px-0 md:px-10 lg:px-10 max-h-96 overflow-hidden ScrollBarForHelp my-3 mt-2 '>
                    
          <div className='py-5 flex flex-col lg:flex-row  gap-5  w-11/12  justify-between items-center h-full'>
          <div className='mt-8 flex flex-col justify-center items-center gap-3 text-xl font-bold bg-gradient-to-tr from-purple-500 via-indigo-500 to-indigo-700 text-transparent bg-clip-text'>
              <div className=' text-3xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-indigo-700 text-transparent bg-clip-text '>
              <NumberCounter end={stats.totalSongsPlayed} delay={3}/>
 
              </div>

          <p >Total Songs Played </p>
          </div>  
          <div className='  mt-8 flex flex-col justify-center items-center gap-3  text-xl font-bold bg-gradient-to-tr from-purple-500 via-indigo-500 to-indigo-700 text-transparent bg-clip-text'>
          <div className='pb-1 text-3xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-indigo-700 text-transparent bg-clip-text '>
          <NumberCounter end={stats.totalLikesCount} delay={3}/>
 
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
          </div>
          
           
          
          </div>
  )
}

export default TempForStats
