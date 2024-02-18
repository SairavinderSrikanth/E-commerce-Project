import React, { useState } from 'react'
import './CSS/LoginSignUp.css'
const Loginsignup = () => {

  const [condition,setCondition]=useState("Signup");
  const [formData,setformData]=useState({
    username:"",password:"",email:""
  })

  const changeHandler=(e)=>{

    setformData({...formData,[e.target.name]:e.target.value});
  }



  const login =async ()=>{
    console.log("Login func executed ",formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
      },
      body:JSON.stringify(formData),
      }).then((res)=>res.json()).then((data)=>responseData=data)
      if(responseData.success){
        localStorage.setItem('auth-token',responseData.token);
        window.location.replace("/");
      }else{
        alert(responseData.errors)
      }
    




  }
  const signup =async ()=>{
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
      },
      body:JSON.stringify(formData),
      }).then((res)=>res.json()).then((data)=>responseData=data)
      if(responseData.success){
        localStorage.setItem('auth-token',responseData.token);
        window.location.replace("/");
      }else{
        alert(responseData.errors)
      }
    
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{condition}</h1>
        <div className="loginsignup-fields">
          {condition==="Signup"?<input onChange={changeHandler}  name="username" value={formData.username} type="text" placeholder='Your Name' />:<></>}
          <input onChange={changeHandler}  name="email" value={formData.email} type="email" placeholder='Email Address' />
          <input onChange={changeHandler}  name="password" value={formData.password} type="password" placeholder='Password' />
        </div>
        <button onClick={()=>{condition==="Signup"?signup():login()}}>Continue</button>
        {condition==="Signup"?<p className="loginsignup-login">Already have an account? <span onClick={()=>{setCondition("Login")}}>Login here</span></p>:<p className="loginsignup-login">Create an account? <span onClick={()=>{setCondition("Signup")}}>Click here</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}
export default Loginsignup
