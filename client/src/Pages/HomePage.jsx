import React, { useState } from 'react'
import EmailClient from "../components/EmailClient"
import SplashScreen from "../components/SplashScreen";

const HomePage = () => {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <EmailClient />
      )}
    </>
  )
}

export default HomePage
