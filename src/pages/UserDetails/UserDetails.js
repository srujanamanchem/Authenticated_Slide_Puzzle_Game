import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'


const UserDetails = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("Profile"))
    // console.log(user)

    const [userData, setUserData] = useState({})
    const [errors, setErrors ] = useState({})
    const [isSubmit, setIsSubmit ] = useState(false)

    const handleChange = (e)=>{
        const { name, value } = e.target

        if(name==="image"){
            const file = e.target.files[0];

            if(file && file.type.substring(0,5)==="image"){
                setUserData({...userData, [name]:file})
            }else{
                setUserData({...userData, [name]:null})
            }
        }else{
            setUserData({...userData, [name]:value})
        }
        
        
    }

    const validateFormData = (values)=>{
        const errors = {}

        if(!values.image){
            errors.image = "An image file is Required!"
        }
        if(!values.date){
            errors.date = "Date of Birth is Required!"
        }
        if(!values.address){
            errors.address = "Address is Required!"
        }else if(values.address.length < 20){
            errors.address = "Enter Detailed Adrress"
        }
        if(!values.mobileNumber){
            errors.mobileNumber = "Mobile Number is Required!"
        }else if(values. mobileNumber.length !== 10){
            errors.mobileNumber = "Enter a Valid Mobile Number"
        }
        console.log(errors)
        return errors
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        setIsSubmit(true)
        if(user){
            setErrors(validateFormData(userData))
        }else{
            alert("Please signup first")
            navigate('/signup')
     }
        
    }

    useEffect(()=>{
        if(Object.keys(errors).length === 0 && isSubmit){
            const updatedData = {...user, ...userData}
            localStorage.setItem("Profile", JSON.stringify(updatedData))
            alert("Data Uploaded successfully")
            navigate('/')
        }
    },[errors, isSubmit])


  return (
        <div className='div-container'>
            <h1>User Details</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor='profileImg'>
                <h4>Profile Picture</h4>
                <input 
                type="file" 
                name="image"
                accept='/images/*'
                onChange = {handleChange} id="profileImg"
                />
            <p className='form-errors'>{errors.image}</p>
            </label>
            <label htmlFor='dob'>
                <h4>Date of Birth</h4>
                <input type="date"
                name="date"
                onChange = {handleChange}
                id="dob"/>
            <p className='form-errors'>{errors.date}</p>
            </label> 
            <label htmlFor='address'>
                <h4>Address</h4>
                <input type="text"
                name="address"
                onChange = {handleChange}
                id="address"/>
            <p className='form-errors'>{errors.address}</p>
            </label>
            <label htmlFor='mobileNumber'>
                <h4>Mobile Number</h4>
                <input type="number"
                name="mobileNumber"
                onChange = {handleChange}
                id="mobileNumber"/>
            <p className='form-errors'>{errors.mobileNumber}</p>
            </label>
            <button type="submit">Save</button>
            </form>
            <Link to='/signup' style={{color:"rgb(2,22,203)", fontSize:"14px", textDecoration:"none", cursor:"pointer", margin:"2px 0px"}}>⮞ Go to Signup Page</Link>
        </div>
    )
}

export default UserDetails
