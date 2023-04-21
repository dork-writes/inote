  import React from 'react'
  import { useState } from 'react'
  import { Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
  import { useEffect } from 'react';
  import Joi from 'joi';


  export default function Logister(props) {
    let location = useLocation();
    let navigate = useNavigate();
    const [back, changeBack] = useState('#121212dc');
    const [front, changeFront] = useState('#ffffffcd');

    const [name, updateName] = useState('');
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');
    const [errName, setEN] = useState('');
    const [errEmail, setEE] = useState('');
    const [errPassword, setEP] = useState('');
    const [formError, setError] = useState('');

    const schema = Joi.object({
      name: Joi.string().required().label("Name"),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().label("Email"),
      password: Joi.string().min(8).required().label("Password")
    });

    let handleSubmit = async(e) =>
    {
      e.preventDefault();
      let errors = schema.validate({name, email, password}, {abortEarly:false}).error;
      if (errors)
      {
        let nameErr = errors.details.filter(r => r.context.label ? r.context.label === 'Name' : null);
        let emailErr = errors.details.filter(r => r.context.label ? r.context.label === 'Email' : null);
        let passErr = errors.details.filter(r => r.context.label ? r.context.label === 'Password' : null);
        nameErr.length ? setEN(nameErr[0].message) : setEN('');
        emailErr.length ? setEE(emailErr[0].message) : setEE('');
        passErr.length ? setEP(passErr[0].message) : setEP('');
        setError('');
      }

      else
      {
        setEN(''); setEE(''); setEP('');
        let path = location.pathname === "/inote/authentication" ? 'login' : 'usercreator';
        let body = location.pathname === "/inote/authentication" ? {email, password} : {name, email, password};
        let response = await fetch(`${props.API.auth}/${path}`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true'

          },
          body: JSON.stringify(body)
        });

        try
        {
          let authToken = await response.json();
          //console.log(authToken);
          if (authToken.error)
          {
            setError(authToken.error);
          }
      
          else
          {
            props.updateToken(authToken);
            localStorage.setItem('inotes-token', authToken);
            navigate('/inote/notes');
          }
        }

        catch(err)
        {
          setError('Unexpected error occurred');
        }
      }
    }

    let handleChange = (event, type) =>
    {
      
      if(type === 'name')
      {
        updateName(event.target.value);
      }
      
      else if (type === 'email')
      {
        updateEmail(event.currentTarget.value);
      }
      
      else if (type === 'password')
      {
        updatePassword(event.currentTarget.value);
      }

    }

    useEffect(() =>
    {
      localStorage.removeItem("inotes-token");
      if (location.pathname === "/inote/authentication")
      {
        changeBack('#ffffffcd');
        changeFront('#121212dc');
        updateName('Your Name');
      }
      else if (location.pathname === "/inote/authentication/register")
      {
        changeBack('#121212dc');
        changeFront('#ffffffcd');
        updateName('');
        setError('');
      }
    }, [location.pathname]);
    
    return (
      <div className='h-[105vh] bg-[#121212dc] py-5'>
      <div className = "flex flex-col justify-center font-[titillium] h-[100%]">
        <div className = "rounded-sm w-[90%] sm:w-[80%] md:w-[70%] ml-auto mr-auto lg:w-[50%]">
          <div className = "grid grid-cols-2 text-2xl text-center rounded-sm">
              <Link to="/inote/authentication"><div className = {`rounded-t-sm py-4 bg-[${back}] text-[${front}] cursor-pointer`}>Login</div></Link>            
              <Link to = "register"> <div className = {`rounded-t-sm py-4 bg-[${front}] text-[${back}] cursor-pointer`}>Register</div></Link>            
          </div>
          <div className = "bg-[#ffffffcd] text-[#121212dc] rounded-b-sm px-5 py-2">
            <Outlet context = {[name, email, password, handleChange, errName, errEmail, errPassword, handleSubmit, formError]}/>
          </div> 

        </div>
      </div> 
      </div>
    )
  }
