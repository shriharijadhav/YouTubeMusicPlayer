import React from 'react'
import CircularDiv from './CircularDiv';

// logos
import twitterLogo from '../images/twitterLogo.svg'
import githubLogo from '../images/githubLogo.svg'
import linkedInLogo from '../images/linkedInLogo.svg'
import harryLogo from '../images/logo/shrihariLogo.png'

const Footer = () => {
  const handleOnclick = () =>{
    window.open('https://portfolio-frontend-phi-blue.vercel.app/', '_blank');

  }
  return (
    <div className='relative max-w-sm w-full mt-10 pb-10'>
    <div className='flex flex-col w-full justify-center items-center gap-5'>
        <div className='flex flex-row gap-3'>
            <CircularDiv backgroundColor={'transparent'} imagePath={harryLogo} title={"Portfolio"} socialProfileUrl={'https://portfolio-frontend-phi-blue.vercel.app/'}/>
            <CircularDiv backgroundColor={'#3B82F6'} imagePath={twitterLogo} title={"Twitter"} socialProfileUrl={'https://twitter.com/i_amHariii'}/>
            <CircularDiv backgroundColor={'#D72980'} imagePath={githubLogo} title={"Github"} socialProfileUrl={'https://github.com/shriharijadhav'}/>
            <CircularDiv backgroundColor={'#2563EB'} imagePath={linkedInLogo} title={"LinkedIn"} socialProfileUrl={'https://www.linkedin.com/in/shriharijadhav126/'}/>

        </div>
        <div className='text-base text-gray-600 dark:text-gray-400 dark:hover:text-gray-100 hover:cursor-pointer  ' onClick = {handleOnclick} title='Click to Get in Touch'>
          {`</> & Crafted with 💛 by Shrihari`}             
        </div>
    </div>
</div>
  )
}

export default Footer
