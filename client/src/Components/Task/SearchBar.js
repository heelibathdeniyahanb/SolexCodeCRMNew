import React from "react";
import { CiSearch } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

function SearchBar(){
    return(
        <div className="serach flex px-4 py-5">
            <div className="select flex">
                    <input type="checkbox"></input>
                    <div className="px-4 ">All Tasks</div> 
                    <MdDeleteOutline fontSize={23}/>

            </div>
            <div className="only bar px-4 flex"  >
                    <input type="text" placeholder="Search.. " className="border px-4 rounded-lg" ></input>
                   
                    <CiSearch fontSize={23}   />

            </div>
        </div>
        
    )
}


export default SearchBar;