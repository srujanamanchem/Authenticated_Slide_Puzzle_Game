import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Game from '../Game/Game'

const PuzzleGame = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem("Profile")){
      navigate('/')
    }
  }, [])
  
    return (
      <>
        <Game/>
      </>
    )
    
}

export default PuzzleGame
