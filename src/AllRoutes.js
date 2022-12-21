import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Auth from './pages/Auth/Auth';
import Login from './pages/Login/Login';
import UserDetails from './pages/UserDetails/UserDetails';
import PuzzleGame from './components/PuzzleGame/PuzzleGame'
  

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path='/signup' element={<Auth />} />
        <Route path='/user-details' element={<UserDetails/>}/>
        <Route path = '/puzzle-game' element = {<PuzzleGame/>}/>
    </Routes>
  )
}

export default AllRoutes
