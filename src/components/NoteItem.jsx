import React from 'react'
import { Link } from 'react-router-dom'
import show from '../assets/images/showpassword.svg'
import edit from '../assets/images/edit.svg';
import deleteItem from '../assets/images/delete.svg'

export default function NoteItem(props) {

  const handleDelete = async() =>
  {
    props.deleteNote(props.id);
  }

  return (
    <div className = {`card-${props.id} grid tag-grid border-2 border-[#121212dc] rounded-md bg-[#121212dc] text-[#ffffffdd] pl-3 pr-2 md:pr-3 lg:pr-1 py-5 w-[90vw] sm:w-[40vw] md:w-[40vw] lg:w-[25vw] xl:w-[20vw]`}>
        <div>
            <p className = "text-2xl py-2">{props.title}</p>
            <p className = "text-md py-1">{props.description}</p>
            <div className = "space-x-2 space-y-4 mt-2">
              <Link to = {`/inote/updatenote/${props.id}`}><button className = "text-sm bg-green-300 text-[#121212dc] px-3 rounded-sm py-1 hover:bg-green-200 transition-all"><img alt = "edit" src = {edit} width = "20rem" className='inline mr-1'/>Edit</button></Link >
              <Link to = {`/inote/notes/${props.id}`}><button className = "text-sm bg-blue-300 text-[#121212dc] px-3 rounded-sm py-1 hover:bg-blue-200 transition-all"><img src = {show} alt = "view" width = "20rem" className='inline mr-1'/>View</button></Link>
            </div>
            <button onClick = {handleDelete}  className = "px-[2.9rem] text-sm bg-red-400 text-[#ffffffca] rounded-sm py-1 hover:bg-red-300 transition-all mt-4"><img src = {deleteItem} alt = "view" width = "20rem" className='inline mr-1'/>Delete</button><br />
        </div>
        <div>
            <div className='ml-auto'>
              <p className = "text-sm bg-amber-200  my-[-5px] text-[#121212dc] text-center py-[1px] rounded-xl w-fit px-2 ml-auto mr-auto">{props.tag}</p>
            </div>
        </div>
    </div>
  )
}
