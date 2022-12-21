import React, { useState}from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  // console.log(user)
  const [loginData, setLoginData] = useState({})
  const [formErrors, setFormErrors] = useState({})  
  const [isSubmit, setIsSubmit] = useState(false)


  const handleChange = (e)=>{
    const {name, value} = e.target
    setLoginData({...loginData, [name]:value})
  }

  const validate = (values)=>{
    const errors = {}
    const user = JSON.parse(localStorage.getItem("Profile"))

    if(user){
      if(!values.email){
        errors.email = "Email is Required!"
      }else if(user.email !== values.email){
        errors.email = "Invalid Email"
      }
    if(!values.password){
      errors.password = "Password is Required!"
    }else if(user.password !== values.password && user.email === values.email){
      errors.password = "Incorrect Password"
    }
  }else{
    alert("Invalid User, Please Signup")
  }
  return errors
  }

  
  const handleSubmit = (e)=>{
    e.preventDefault()
    setFormErrors(validate(loginData)) 
    setIsSubmit(true) 
    console.log(loginData)
    console.log(formErrors)
    if(Object.keys(formErrors).length ===0 && isSubmit ){
      // console.log("user-logged")
      navigate('/puzzle-game')
    }
  }


    return ( 
      <div className='div-container'> 
        <h1>Login</h1>
      <form  onSubmit={handleSubmit}>
          <label htmlFor="email">
              <h4>Email</h4>
              <input 
              type="email" 
              id="email" 
              name='email' 
              placeholder='Enter Your Email' 
              onChange={handleChange}
              />
              <p className='form-errors'>{formErrors.email}</p>
          </label>
          <label htmlFor="password">
              <h4>Password</h4>
              <input 
              type="password" 
              id="password" 
              name='password' 
              placeholder='Enter Your Password' 
              onChange={handleChange}
              />
              <p className='form-errors'>{formErrors.password}</p>
          </label>
          <button type='submit'>Submit</button>
      </form>
      <Link to='/signup' style={{color:"rgb(2,22,203)", fontSize:"14px", textDecoration:"none", cursor:"pointer", margin:"2px 0px"}}>⮞ Go to Signup Page</Link>
      </div>
    )
}

export default Login
