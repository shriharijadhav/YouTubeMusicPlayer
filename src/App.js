import './App.css';
import React, { useEffect, useState } from 'react';


//  import 'react-toastify/dist/ReactToastify.css';

 
import MainComponent from './components/MainComponent';
import LoaderForOfflineUser from './components/LoaderForOfflineUser';
// import OnlineStatusChecker from './OnlineStatusChecker';

 

function App() {
  const [hasInternet, setHasInternet] = useState(true);

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
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    {hasInternet ? (
      <MainComponent/>

    ) : (
      <LoaderForOfflineUser/>
    )}
        

   
  </div>
    
    
     
  );
}

export default App;

