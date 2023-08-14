import './App.css';
import React, { useContext, useEffect, useState } from 'react';


//  import 'react-toastify/dist/ReactToastify.css';

 
import MainComponent from './components/MainComponent';
import LoaderForOfflineUser from './components/LoaderForOfflineUser';
 import { topLevelContext } from './Context';
 import ModalForPageRefresh from './components/ModalForPageRefresh';
 // import OnlineStatusChecker from './OnlineStatusChecker';

 

function App() {
  const [hasInternet, setHasInternet] = useState(true);

  const {urlArray,setModalForPageRefresh,modalForPageRefresh} = useContext(topLevelContext);
 

  useEffect(() => {
    // Function to check internet connectivity
    const checkInternetConnectivity = async () => {
      try {
        await fetch('https://www.google.com', { mode: 'no-cors' });
        setHasInternet(true);
      } catch (error) {
        setHasInternet(false);
      }
    };

    // Initial check on component mount
    checkInternetConnectivity();

    // Check connectivity every 5 seconds (adjust as needed)
    const interval = setInterval(checkInternetConnectivity, 5000);

    // Clean up interval on component unmount

    const handleBeforeUnload = (e) => {
      
      if(urlArray.length === 0) {
        // console.log('if blok')
        // do nothing and refresh the page
      }
      else{
    //  console.log(urlArray.length)
    e.preventDefault();
      e.returnValue = '';
      // console.log('inside function');
      setModalForPageRefresh(true);

       }
    };
   window.addEventListener('beforeunload', handleBeforeUnload);

    return () =>{
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);

 
    } 
  }, [urlArray.length]);

  return (
    <div>
    {hasInternet ? (
      <MainComponent/>

    ) : (
      <LoaderForOfflineUser/>
    )}
        
    {modalForPageRefresh?(<ModalForPageRefresh/>):(<></>)}

     </div>
    
     
  );
}

export default App;

