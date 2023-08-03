import React, { useEffect, useState } from 'react';

function OnlineStatusChecker() {
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
        <p>You are online!</p>
      ) : (
        <p>Oops! Internet connection lost.</p>
      )}
    </div>
  );
}
export default OnlineStatusChecker;
