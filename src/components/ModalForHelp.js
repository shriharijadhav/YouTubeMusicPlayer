import React, { useContext } from 'react';
import '../App.css';
import { topLevelContext } from '../Context';

   
function ModalForHelp() {

    const {setOpenModalForHelp} = useContext(topLevelContext);


const stepsToUseMusicPlayer = [
    {
        id:0,
        step:'🍭 Copy link (URL) for any Youtube video or playlist  that you like from browser or YouTube mobile app.',
      },
     {
        id:1,
        step:'🍭 Paste it into input field of our Music player & click (+) button once to play music.',
     },
     {
        id:2,
        step:'🍭 Rest assured, You don\'t need to copy-paste URLs for every time.',
        subStep:'( We have added "Save to Local" feature so that you don\'t need to copy and paste video URls for every time you want to play music 😃.)'

     },
     {
        id:3,
        step:'🍭 Use "Save to Local" once done with creating playlist',
        subStep:'Save to local or Load from local helps to reduce efforts of copy-pasting URLs for every time.'

     },
     
];

const features =[
    {
        id:0,
        featureTitle:'🎶 Enjoy Ad-Free Music',
        descriptionOfFeature:'Listen to your favorite tracks without any interruptions from ads, allowing you to fully immerse yourself in the music.'
    },
    {
        id:1,
        featureTitle:'✨ Create Personalized Playlists',
        descriptionOfFeature:'Curate your own playlist, ensuring that you have a collection of music that perfectly matches your taste.'
    },
    {
        id:2,
        featureTitle:'⚡ Merge an infinite number of playlists effortlessly',
        descriptionOfFeature:'With our app\'s innovative playlist merging feature, the possibilities are limitless, allowing you to create harmonious medleys and curated collections that resonate with your soul.'
    },
    {
        id:3,
        featureTitle:'🌟 100% Free',
        descriptionOfFeature:'Say goodbye to hidden charges and experience premium services, absolutely free!'
    },
    {
        id:4,
        featureTitle:'🔄 Save or Load Playlist',
        descriptionOfFeature:'Save your carefully curated collections or load previously saved playlists effortlessly to/from, ensuring your favorite tracks are always within reach.'
    },
    {
        id:5,
        featureTitle:'🌠 Dark Mode & Light Mode',
        descriptionOfFeature:'Switch between dark mode and light mode to customize the player\'s appearance based on your preference, making it easy on your eyes at any time of the day.'
    },
   
    {
        id:6,
        featureTitle:'🚀 Save upto 95% data',
        descriptionOfFeature:'Experience the true potential of our app and enjoy streaming audio-only for your favorite YouTube videos, saving you a remarkable 95% in data usage.'
    }

];
  return (
    <div className='modalBackground '>
      <div className='modalContainer  dark:bg-gray-400 bg-indigo-300 dark:text-indigo-900 text-indigo-900 w-10/12 sm:w-10/12 md:w-7/12 lg:w-7/12 xl:w-7/12 mx-auto flex flex-col gap-5 z-50 p-10 rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
    
         <div className='flex flex-row  w-full justify-end items-center border-b-2 p-3 md:px-10 lg:px-10 '>
            <div className='flex flex-row w-full justify-between  items-center text-xl dark:text-indigo-900 md:px-2 '>
            <div className='text-xl font-bold'>Help </div>
            <div className='text-xl cursor-pointer'onClick={()=>setOpenModalForHelp(false)} title='close'>X</div>
            </div>
        </div>
        <div className='px-0 md:px-10 lg:px-10 max-h-96 overflow-x-hidden overflow-y-scroll ScrollBarForHelp my-3 '>
        <div className='flex flex-row justify-center text-xl md:text-2xl lg:text-2xl pb-3  my-3 font-bold'>How to use this Music Player?</div>
        {
            stepsToUseMusicPlayer.map((step)=>{
                return(
                    <ul>
                        <li className='mt-5 ' key={step.id}>
                            <div className='text-xl font-medium'>{step.step}</div>
                            <div  className='text-base '>{step.subStep}</div>
                         </li>
                     </ul>
                   
                )
            })
        }
        <div className='text-xl mt-10'>That's all you need to do !</div>
        <div className='text-xl py-1'>Wasn't it incredibly easy to enjoy uninterrupted, Ad-free music for completely free of charge? 😉</div>
        
        
        <div className='flex flex-row  w-full justify-end items-center border-b-2  p-3  '>
            <div className='flex flex-row w-full justify-between  items-center text-xl dark:text-indigo-900  '>
              <div className='text-xl font-bold'>  </div>
            </div>
            
        </div>
        <div className='flex flex-row justify-center text-xl md:text-2xl lg:text-2xl  pt-10 pb-5 font-bold'>Why to use this Music Player?</div>

        {
            features.map((feature)=>{
                return(
                    <div className='mt-3 ' key={feature.id}>
                        <div className='text-lg  font-medium'>{feature.featureTitle}</div>
                        <div className='text-base'>{feature.descriptionOfFeature}</div>
                    </div>
                )
            })
        }
        <div className='flex flex-row  w-full justify-end items-center border-b-2  p-3  '>
        <div className='flex flex-row w-full justify-between  items-center text-xl dark:text-indigo-900  '>
          <div className='text-xl font-bold'>  </div>
        </div>
        
    </div>
    <div className='flex flex-row justify-center text-xl md:text-2xl lg:text-2xl  pt-5 pb-3 font-bold'>Contact Us</div>
    <div className='text-lg py-5'>Have any questions, suggestions, or feedback? We'd love to hear from you!</div>
    <div className=' flex text-lg w-full justify-center items-center ' title='Click this link to write to us'>
    📧<a href='mailto:mr.shrihari212@gmail.com?subject=Inquiry/Feedback%20from%20Music%20Player%20User' className='underline decoration-wavy md:decoration-solid lg:md:decoration-solid underline-offset-8 hover:decoration-wavy hover:cursor-pointer ml-1'> Admin@MusicPlayer</a>
</div>
    <div className='text-lg mt-5'>Please click on above link to write to us.</div>
   
        </div>
      </div>
    </div>
  );
}

export default ModalForHelp;