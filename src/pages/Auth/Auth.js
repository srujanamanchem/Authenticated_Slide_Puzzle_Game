import React, { useEffect, useState, useRef } from 'react'
import { Link, redirect, useNavigate} from 'react-router-dom'

import emailjs from '@emailjs/browser'; 
import {v4 as uuidv4} from 'uuid'


const Auth = () => {

    const form = useRef()
    const navigate = useNavigate()

    const initialValues = { email:'', password:''}
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false)

    
    const handleChange = (e)=>{
        const { name, value } = e.target
        setFormValues({...formValues, [name]:value})
            // console.log(formValues)
    }



    const handleSubmit = (e)=>{
        e.preventDefault()
        setFormErrors(validate(formValues))
        emailjs.sendForm('service_dzzmry9', 'template_1bvsvwt', form.current, 'Eu0DYRAAfZz--7ivr')
        .then((result) => {
            alert(`Verification Email sent`)
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        setIsSubmit(true)
    }


    useEffect(()=>{
        // console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
            // console.log(formValues)
            let userProfile = {
                id:uuidv4(), ...formValues
            }
            localStorage.setItem("Profile", JSON.stringify(userProfile))
            navigate('/user-details')
        }
    },[formErrors,isSubmit])

    const validate = (values)=>{
        const errors = {}
        
        const emailRegex =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

        if(!values.email){
            errors.email = "Email is Required!"
        }else if(!emailRegex.test(values.email)){
            errors.email = "This is not a valid Email"
        }

        if(!values.password){
            errors.password = "Password is Required!"
        }else if (values.password.length < 8){
            errors.password = "Password must contain minimum 8 characters"
        }else if(values.password.length > 16){
            errors.password = "Password must not exceed 16 characters"
        }else if(!passRegex.test(values.password)){
            errors.password= "Password should contain atleast one number and one special character"
        }
        return errors;
    }
  
    return (
            <div className='div-container'>
                <h1>
                    SignUp
                </h1>
            <form ref={form} onSubmit={handleSubmit}>

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
            <Link to='/' style={{color:"rgb(2,22,203)", fontSize:"14px", textDecoration:"none", cursor:"pointer", margin:"2px 0px"}}>⮞ Go to Login Page</Link>
            </div>
        )
         
}

export default Auth
