import React, { useState } from "react";
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import navButton from "./NavButton.js";
import ToggleNavDropDown from './ToggleNavDropDown.js';
import handleButtonClick from "./ToggleNavDropDown.js";
import logo from "../icons/AALogo.png";

  
  export default function Navbar(){
    
    return (
        
        <div className="navbar">
            <div className="navbarItems">
            <div className="navMenu">
                
                {/* Below is the HamburgerMenu on Nav Bar */}
                    <div className="hamburgerMenuBtn"   >

                            <ToggleNavDropDown> {/* className=showChildren */}
                                
                                    <ul>

                                    <div className="hamburgerListItem">
                                        <Link to="/" onClick={handleButtonClick} ><div>Home</div></Link>
                                    </div>
                                    <div className="hamburgerListItem">  
                                        <Link to="/Squadranking" onClick={handleButtonClick}> <div>Squad Rank</div></Link>
                                    </div>
                                    <div className="hamburgerListItem"> 
                                        <Link to="/Indranking" onClick={handleButtonClick}> <div>Individual Rankings</div></Link>
                                    </div>
                                    <div className="hamburgerListItem"> 

                                        <Link to="/" onClick={handleButtonClick}> <div>Records</div></Link>
                                    </div>
                                    <div className="hamburgerListItem"> 
                                        <Link to="/Schoolprofiles" onClick={handleButtonClick}  > <div>School profiles</div></Link>
                                    </div>
                            
                                </ul>
                            </ToggleNavDropDown>
                </div>
            </div>

            {/* Below is the Nav Bar Buttons */}
            <div className='navButton'>
                <CustomLink to="/features" className="active">Features</CustomLink>
            </div>

            <div className='navButton'>
                <CustomLink to="/faq" className="active">FAQ</CustomLink>
            </div>

            <div className='navButton'>
                <CustomLink to="/about" className="active">About</CustomLink>
            </div>


            </div>
        </div>

    )
}

function CustomLink({to, children, ...props }){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return(
        <li className={isActive === to ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>

    )

}















