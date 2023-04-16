import DropdownMenu from "../components/DropdownMenu";
import React, { useState, useEffect } from "react";
export default function Squadranking(){

    const[click, setClick] = useState (false);
    const Hoverable= () => setClick(!click);

    // const onMouseEnter = () = => {
    //     if(WritableStreamDefaultController.innerWidth < 960) {
    //         setDropdown(false);
    //     } else {
            
    //     }
    // }
    

    return (
    <div>
        <div className='squadHeader'>
            <h2> Squad Statistics </h2>
            <p>This page will allow you to view stats by school to view their best events, highest scorers, etc.</p>
        </div>

        <div className="squadContainer">
            <div className='filterButton'>
                <select >
                    <option >Division I</option>
                    <option >Division II</option>
                    <option >Division III</option>
                </select>
            </div>



            <div className='filterButton'>
                <select >
                    <option >Conference I</option>
                    <option >Conference II</option>
                    <option >Conference III</option>
                </select>
            </div>

            <div className='filterButton'>
                <select >
                    <option >100m</option>
                    <option >Long Jump</option>
                    <option >Pole Vault</option>
                </select>
            </div>


            <div className='squadCard'> </div>

        </div>


    </div>

    
    
    
    
    
    
    )
}