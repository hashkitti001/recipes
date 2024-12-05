import { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true); 
    }
  }, []);

  
  const acceptAllCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false); 
  };

 
  const rejectAllCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-consent-banner bg-gray-200 p-6 fixed bottom-0 w-full flex justify-between items-center">
      <p className="text-gray-700">
        We use cookies to improve your experience. By continuing, you agree to our cookie policy.
      </p>
      <div className="flex gap-3">
        <button onClick={acceptAllCookies} className="bg-green-500 text-white px-4 py-2 rounded-md">
          Accept All
        </button>
        <button onClick={rejectAllCookies} className="bg-red-500 text-white px-4 py-2 rounded-md">
          Reject All
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
