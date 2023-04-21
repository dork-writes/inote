import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import AddNote from './AddNote';
import Carousel from './Carousel'
import NoteItem from './NoteItem'
import compose from '../assets/images/compose.svg';
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader';

export default function Notes(props) {

  const navigate = useNavigate();
  const [notes, updateNotes] = useState([]);
  const [filteredNotes, updateFiltered] = useState([]);
  const [tags, updateTags] = useState([]);
  const [notesEmpty, setEmpty] = useState('Your notes will be displayed here');
  const [loading, isLoading] = useState(true);

  const deleteNote = async(id) =>
  {
    isLoading(true);
    let response = await fetch(`${props.API.notes}/deletenote/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': props.token
      }
    });

    response = await response.json();
    
    isLoading(false);

    if (response.error)
    {
      //console.log(response.error);
    }

    else
    {
      updateFiltered(filteredNotes.filter(r => r._id !== id));
      updateNotes(notes.filter(r => r._id !== id));
    }
  }

  useEffect(()=>
  {
    let fetchnotes = async() =>
    {
      //console.log(props.token);
      try
      {
        let response = await fetch(`${props.API.notes}/getnotes`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': props.token
          }
        });
  
        let response2 = await fetch(`${props.API.notes}/fetchtags`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': props.token
          }
        });
  
        response = await response.json();
        response2 = await response2.json();
        
        if (!response.error  && !response2.error)
        {
          updateNotes(response);
          updateFiltered(response);
          updateTags(response2);
          setEmpty('Your notes will be displayed here');
          isLoading(false);
        }
        
        else
        {
          setEmpty("You can't access notes");
          isLoading(false);
        }
      }

      catch(err){}
    }
    
    fetchnotes();
  },[props.token, props.API.notes]);

  let tagClick = (tagName) =>
  {
    if (tagName === 'All')
    {
      updateFiltered(notes);
    }

    else
    {
      updateFiltered(notes.filter(r => r.tag === tagName));
    }
  }

  return (
    <div>
      <div className = "flex flex-col my-5 justify-center h-[100%] bg-[#ffffffcd] py-5 md:py-12">
          {notesEmpty !== "You can't access notes" ? <button onClick = {()=>{navigate('/inote/addnote')}}className= "px-4 py-1 text-[#ffffffcd] bg-[#121212dc]  w-[80%] sm:w-fit rounded-sm ml-auto mr-auto mb-5 hover:bg-gray-600 transition-all"><p className='ml-auto mr-auto w-fit flex'><img alt = "compose icon" src = {compose} width = "20rem"/>&nbsp;&nbsp; Create Note</p></button>:''}
          {loading ? <Loader /> : filteredNotes && filteredNotes.length ? 
            <>
            <Carousel tagClick = {tagClick} tags = {tags ? tags : []}/>
            <div className = "ml-auto mr-auto py-5 gap-x-10 gap-y-5 md:gap-y-10 lg:gap-y-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-2">
              {filteredNotes.map(r => 
                <NoteItem key = {r._id} title = {`${r.title.slice(0,r.title.length > 7 ? 7 : r.title.length)}${r.title.length > 7 ? '...':''}`} description = {`${r.description.slice(0,r.description.length > 15 ? 15 : r.description.length)}${r.description.length > 15 ? '...':''}`} tag = {`${r.tag.slice(0,r.tag.length > 5 ? 5 : r.tag.length)}${r.tag.length > 5 ? '...':''}`} id = {r._id} deleteNote = {deleteNote}/>
              )}    
              <Link to = "/inote/addnote"><AddNote /></Link>
            </div></>: <div className = "w-fit ml-auto mr-auto font-[titillium] text-xl text-[#121212dc] flex flex-col justify-center h-[60vh]"><p>{notesEmpty}</p></div>}
      </div>
   </div>
  )
}
