import React from 'react';

const SearchIcon = ({ backgroundColor, imagePath,title,setOpenModalForSearch }) => {
  const divStyle = {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    backgroundColor: backgroundColor,
    cursor:'pointer',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const handleOpenPlaylistModal = () => {
    setOpenModalForSearch(true);
    // console.log("clicked")
   }

  return (
    <div>
    <div className="flex items-center justify-center" style={divStyle} title={`${title}`} onClick={handleOpenPlaylistModal}>
    <img src={imagePath} className='scale-125' alt='SearchIcon' />
    </div>
    </div>
  )
 
  
};

export default SearchIcon;
