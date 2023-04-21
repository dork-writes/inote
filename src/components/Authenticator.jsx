import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Authenticator(props) {
 let navigate = useNavigate();  

 useEffect(()=>
 { 
    let authToken = localStorage.getItem('inotes-token');
    authToken ? props.updateToken(authToken) : props.updateToken('');
    //console.log(authToken);
    if (authToken)
    {
        navigate('/inote/notes');
    }

    else
    {
        navigate('/inote/authentication');
    }

 },[navigate, props])
  return (
    <div>Authenticator</div>
  )
}
