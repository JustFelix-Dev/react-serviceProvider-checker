import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {
  createBrowserRouter,createRoutesFromElements,Route,RouterProvider,
       } from "react-router-dom";
import NetworkChecker from './NetworkChecker'

function App() {
  const router = createBrowserRouter(
     createRoutesFromElements(
      <Route path='/' element={<NetworkChecker/>}/>
     )
  )

  return (
    <>
       <RouterProvider router={router}>

       </RouterProvider>
      
    </>
  )
}

export default App
