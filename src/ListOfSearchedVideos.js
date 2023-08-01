import React from 'react'
import bgImgForSearch from './images/SearchDefaultbackground.svg';
import LoaderForSearch from './LoaderForSearch';
import YoutubeVideoCard from './YoutubeVideoCard';
const ListOfSearchedVideos = ({displayDefaultImgForSearch,dataFetchedSuccess,searchDataAfterFetch,successToast,urlArray,setUrlArray}) => {
  return (
    <div className='px-0 md:px-5 lg:px-1 max-h-96 overflow-x-hidden overflow-y-scroll ScrollBarForHelp my-3 '>
    {
        displayDefaultImgForSearch?
        (<div className='flex flex-row justify-center items-center'>
        <img src={bgImgForSearch} alt='BackGroundForSearch' className='w-60 md:w-80 lg:w-80 h-60 md:h-80 lg:h-80' />
    
        </div>)
        :(<div>
          {
            dataFetchedSuccess?
            
            (<div className='flex flex-col gap-2 justify-center items-center p-1'>

            
                
                
               {
                searchDataAfterFetch.length !==0 ? ( 
                  searchDataAfterFetch.map((video,index)=>{return(
                    <YoutubeVideoCard title={video.snippet.title} thumbnailUrl={video.snippet.thumbnails.medium.url} key={index} videoId={video.id.videoId}  channelName={video.snippet.channelTitle} successToast={successToast} urlArray={urlArray} setUrlArray={setUrlArray}/>

                  )
                  })
                
                ) :(<LoaderForSearch/>)
               }
            
               
            <div className='py-2 text-lg underline decoration-wavy underline-offset-8'>Currently, We only support top 20 relevant searches </div>
             </div>)
            :(<div>
              
               <LoaderForSearch/> 
              </div>)
        }
          {/*<LoaderForSearch/>*/}
          </div>)
    }
    
    
    </div>
  )
}

export default ListOfSearchedVideos
