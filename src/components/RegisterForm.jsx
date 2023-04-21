import React from 'react'
import { useOutletContext } from 'react-router-dom';
import showpassword from "../assets/images/showpassword.svg";
import hidepassword from "../assets/images/hidepassword.svg";
import { useState } from 'react';

export default function RegisterForm(props) {
  const [name, email, password, handleChange, errName, errEmail, errPassword, handleSubmit, formError] = useOutletContext();
  const [passType, setPassType] = useState('password');
  const [SIcon, setIcon] = useState(hidepassword);

  let toggleVisibility = () =>
  {
    if (passType === 'password')
    {
        setPassType('text');
        setIcon(showpassword)
    }
    
    else
    {
        setPassType('password');
        setIcon(hidepassword);
    }
}
  return (
    <form className = "w-[95%] ml-auto mr-auto space-y-10">
    <h1 className= {`text-3xl px-1 ${props.logo} transition-all tracking-widest font-[alenia] text-center`}>
      i<span className=" tracking-tight">Note</span>
    </h1>
    <div className = {`focus-within:text-sm text-lg transition-all ${props.hidden}`}>
        <label htmlFor = "email">Name</label><br/>
        <input placeholder = "Your Name" autoComplete = "off" name = "email" className = "text-lg rounded-sm my-1 px-2 py-1 w-[95%] bg-[transparent] border-b-2 border-b-[#121212dc] focus:outline-0" value = {name ? name : ''} onChange={e=>handleChange(e, 'name')} type = "name"/>
        <p className="text-xs md:text-sm text-red-700">{errName} &nbsp;</p>
    </div>
    <div className = "focus-within:text-sm text-lg transition-all">
        <label htmlFor = "email">Email</label><br/>
        <input placeholder = "Your Email" autoComplete = "off" name = "email" className = "text-lg rounded-sm my-1 px-2 py-1 w-[95%] bg-[transparent] border-b-2 border-b-[#121212dc] focus:outline-0" value = {email ? email : ''} onChange={e=>handleChange(e, 'email')} type = "email"/>
        <p className = "text-xs md:text-sm text-red-700">{errEmail} &nbsp;</p>
    </div>
    <div className = "focus-within:text-sm text-lg transition-all">
        <label htmlFor = "password">Password</label><br/>
        <input  placeholder = "Your Password" autoComplete = "off" name = "password" className = "text-lg rounded-sm my-1 px-2 py-1 w-[90%] bg-[transparent] border-b-2 border-b-[#121212dc] focus:outline-0" value = {password ? password : ''} onChange={e=>handleChange(e, 'password')} type = {passType}/>
        <img alt = "show or hide password" onClick = {toggleVisibility} className = "cursor-pointer inline w-5 ml-auto mr-auto" src = {SIcon} />
        <p className = "text-xs md:text-sm text-red-700">{errPassword} &nbsp;</p>
    </div>
    <div className='pb-5'>
      <p className = "text-md text-red-700 text-center py-2">{formError} &nbsp;</p>
      <button onClick = {handleSubmit} className = "bg-[#121212dc] w-[95%] text-[#ffffffcd] py-2 rounded-sm border-2 border-[#121212dc] hover:bg-[transparent] hover:text-[#121212dc] transition-all">Enter</button>
    </div>
    </form>
  )
}
