import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import viteLogo from '/vite.svg'
import { BrowserRouter as Router , Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Task from './pages/Task'
import TaskCreate from './pages/TaskCreate'
import { useSelector } from 'react-redux'


function App() {
  useEffect(()=>{
    if('serviceWorker' in navigator){
      window.addEventListener('load',()=>{
        navigator.serviceWorker.register('/sw.js')
        .then((registration)=>{
           console.log('SW registered: ' , registration);
        })
        .catch(registrationError =>{
          console.log('SW registration failed: ' , registrationError);
        })
      })

    }
  },[])
  const { user } = useSelector((state,action)=> state.user ) 
  return (
    <>
    <Router>
    <Routes>
      <Route path='/' element={!user ? <Login/> : <Navigate to={'/home'}/>}/>
      <Route path='/home' element={user ? <Home/> : <Navigate to={'/'}/>}/>
      <Route path='/task/:id' element={user ? <Task/> : <Navigate to={'/'}/>}/>
      <Route path='/task/create' element={user ? <TaskCreate/> : <Navigate to={'/'}/>}/>
    </Routes>
    </Router>
    <ToastContainer/>

    </>
  )
}

export default App
