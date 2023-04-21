import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Loader from './Loader';

export default function Note(props) {

  const searchParams = useLocation().pathname.split("/")[useLocation().pathname.split("/").length - 1];
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [tag, setTag] = useState('');
  const [err, setErr] = useState('');
  const [loading, isLoading] = useState(true);
  useEffect(()=>
  {
    let fetchnote = async()=>
    {
      let response = await fetch(`${props.API.notes}/getnote/${searchParams}`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token': props.token
        }
      });

      response = await response.json();
      isLoading(false);
      if (response.error)
      {
        setErr('You are not permitted to view this content.');
        //console.log(response.error);
      }

      else
      {
        setTitle(response.title);
        setDesc(response.description);
        setTag(response.tag);
      }
    }
    
    fetchnote();
  },[props.token, props.API.notes, searchParams, setDesc, setTag, setTitle]);

  return (
    <>
    <div className = "px-2 py-2 space-y-10">
      <Link to = "/inote/notes"><button className = "border-2 border-[#121212dc] px-2 py-1 text-[#ffffffcd] bg-[#121212cd] hover:bg-[#ffffffcd] hover:text-[#121212dc] transition-all rounded-sm w-fit"> Back to notes</button></Link>
      { loading ? <Loader />:
        <div className = "flex flex-col h-[100%] justify-center">
          {!err.length ?
            <div className = "border-[#121212aa] bg-[#121212dc] text-[#ffffffcd] w-[95%] lg:w-[60%] ml-auto mr-auto space-y-3 rounded-sm pb-5">
              <p className='text-center bg-amber-200 px-5 py-2 float-right text-[#121212dc] rounded-bl-sm'>{tag}</p>
              <p className = "px-5 py-5 text-3xl border-b-[1px] border-[#ffffffcd]">{title}</p>
              <p className = "px-5 py-5 text-lg border-[#ffffffcd]">{description}</p>
            </div>: <h1 className ="text-center">{err}</h1>
          } 
        </div>
      }
    </div>
    </>
  )
}
