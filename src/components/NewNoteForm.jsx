import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';

export default function NewNoteForm(props) { 
  const location = useLocation();
  const navigate = useNavigate();
  const [title, changeTitle] = useState('');
  const [description, changeDesc] = useState('');
  const [tag, changeTag] = useState('');
  const user = props.user;
  const [err, changeErr] = useState('');
  const [id, setId] = useState('');
  const [isChanged, setChanged] = useState(false);
  const [loading, isLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  let handleSubmit = async e =>
  {
    e.preventDefault();
    let path = location.pathname.includes("/updatenote") ? location.pathname.replace('/inote', '') : '/notecreator';
    let response = await fetch(`${props.notesAPI}${path}`, {
        method: location.pathname.includes("/updatenote") ? 'PUT' : 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'auth-token': props.token
        },
        body: JSON.stringify({title, description, tag, user})
    });

    response = await response.json();
    //console.log(response);

    if(!response.error)
    {
        navigate('/inote/notes');
    }

    else
    {
        changeErr("You do not have access.");
    }
  }

  useEffect(()=>
  {
    let getnote = async ()=>
    {
        if (location.pathname.includes("/updatenote"))
        {
            if (!loaded)
            {
                isLoading(true);
            }

            setId(location.pathname.split('/')[location.pathname.split('/').length - 1]);
            //console.log(id);
            let response = await fetch(`${props.notesAPI}/getnote/${id}`, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': props.token
                }
            });
            
            response = await response.json();
            isLoading(false);
            setLoaded(true);
            if (response.error)
            {
                changeErr('You are not permitted to view this note.');
            }

            else if (!isChanged)
            {
                changeTitle(response.title);
                changeDesc(response.description);
                changeTag(response.tag);
            }
        }
    }

getnote();
  },[setId, location.pathname, id, tag, title, description, changeTitle, changeTag, changeDesc, props.token, user, props.notesAPI, isChanged, loaded, setLoaded]);

  return (
    <>
    <div className = "px-3 py-3">
        <Link to = "/inote/notes"><button className = "border-2 border-[#121212dc] px-2 py-1 text-[#ffffffcd] bg-[#121212cd] hover:bg-[#ffffffcd] hover:text-[#121212dc] transition-all rounded-sm w-fit"> Back to notes</button></Link>
    </div>
    {
        loading ? <Loader />:
        <div className = "px-12 py-5 h-[95vh] bg-[#ffffffcd] w-[100%] lg:w-[60%] ml-auto mr-auto">
        <form className = "my-10 space-y-12 w-[100%]">
            <input onChange = {(e)=>{changeTitle(e.currentTarget.value); setChanged(true);}} placeholder="Title (Optional)" className="py-2 border-b-2 border-b-[#12121299] focus:outline-0 w-[100%] text-2xl" value = {title}/>
            <textarea onChange = {(e)=>{changeDesc(e.currentTarget.value); setChanged(true);}} rows="10" className= "w-[100%] border-2 border-[#12121299] px-2 py-1 focus:outline-0" placeholder="Body" value={description}></textarea>
            <input onChange = {(e)=>{changeTag(e.currentTarget.value); setChanged(true);}} placeholder="Tag (Optional)" className="py-2 border-b-2 border-b-[#12121299] focus:outline-0 w-[100%] text-sm" value={tag}/>
            <button disabled={!description || !isChanged} onClick = {handleSubmit} className = "border-2 disabled:bg-[#12121212] disabled:text-[#12121255] disabled:border-[#12121222] border-[#121212dc] px-5 py-1 text-[#ffffffcd] bg-[#121212cd] hover:bg-[#ffffffcd] hover:text-[#121212dc] transition-all rounded-sm w-fit float-right">Save</button>
            <p className='text-red-700'>{err ? err : ''}</p>
        </form>
    </div>
    }
    </>
  )
}
