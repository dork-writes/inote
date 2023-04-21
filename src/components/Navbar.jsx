import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
    return (
        <div className="flex w-100 bg-[#121212dc] text-[#ffffffcd] px-2 py-1 justify-between">
            <div className="my-1 space-x-2 px-3 py-1 border-[1px]">
                <span className="text-md font-[titillium]">Hi {props.name ? props.name.split(" ")[0] : "User"}</span>
            </div>
            <h1 className= "text-2xl px-1 mt-2 tracking-widest font-[alenia]">
                i<span className="text-[#ffffffcd] tracking-tight">Note</span>
            </h1>
            <div className="bg-red-400 my-1 rounded-sm font-[titillium]">
                <Link to = "/inote/authentication">
                    <button className = "flex space-x-2 px-3 py-2 rounded-sm hover:bg-red-300 transition-all">
                        <span className="text-sm text-[#ffffffcd]">Log Out</span>
                    </button>
                </Link>
            </div>
        </div>
    );
}
