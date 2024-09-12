import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Toaster } from 'react-hot-toast'


import EmailSender from './Components/EmailSender'

function App() {
  

  return (
    <>
      <EmailSender></EmailSender>
      <Toaster></Toaster>
    </>
  )
}

export default App
