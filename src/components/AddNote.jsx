import React from 'react'
import addIcon from '../assets/images/add.svg';

export default function AddNote() {
  return (
    <div className = "flex flex-col justify-center border-2 border-[#121212dc] rounded-md bg-[#ffffffcd] text-[#121212cd] px-2 py-16 w-[90vw] sm:w-[40vw] md:w-[40vw] lg:w-[25vw] xl:w-[20vw] hover:bg-[#fdfded] transition-all cursor-pointer">
        <div>
            <img alt = "add icon" src = {addIcon} width = "30rem" className='ml-auto mr-auto my-2'></img>
            <p className = "text-md py-2 text-center">Create a new note</p>
        </div>
    </div>
  )
}
