import React from 'react'

export default function Carousel(props) {
  let changeColor = (e) =>
  {
    let cbuns = document.getElementsByClassName("carousel-btn");

    for (let cbun of cbuns)
    {
      cbun.style.backgroundColor = "#ffffffcd";
    }

    e.currentTarget.style.backgroundColor = "#fde68a";
    props.tagClick(e.currentTarget.textContent);
  }

  return (
    <div className = "flex carousel space-x-3 my-2 mx-2 px-6 lg:px-20">
      <button onClick = {changeColor} className = "bg-amber-200 carousel-btn px-4 py-1 border-[2px] border-[#121212dc] rounded-3xl">All</button>
      {props.tags.map(r =>
        <button onClick = {changeColor} key = {r} className = "carousel-btn px-4 py-1 border-[2px] border-[#121212dc] rounded-3xl">{r}</button>)
      }
    </div>
  )
}
