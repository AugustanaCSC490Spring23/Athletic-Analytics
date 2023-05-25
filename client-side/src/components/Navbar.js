import React, { useState } from "react";
import "./Navbar.css"
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import navButton from "./NavButton.js";
import DropdownMenu from './DropdownMenu.js';
import handleButtonClick from "./DropdownMenu.js";
import logo from "../icons/HomePageLogo.png";


  export default function Navbar(){
    
    return (
        
        <div className="navbar">
            <div className="navbarItems">
                <div className="navMenu">
                    
                    {/* Below is the HamburgerMenu on Nav Bar */}
                        <div className="DropdownButtonContainer"   >

                                <DropdownMenu> {/* className=showChildren */}
                                    
                                        <ul className="menu">

                                            <div className="listItem">  
                                                <Link to="/Squadranking" onClick={handleButtonClick}> <div>Squad Rank</div></Link>
                                            </div>
                                            <div className="listItem"> 
                                                <Link to="/Indranking" onClick={handleButtonClick}> <div>Individual Rankings</div></Link>
                                            </div>
                                            <div className="listItem"> 
                                                <Link to="/Schoolprofiles" onClick={handleButtonClick}  > <div>School profiles</div></Link>
                                            </div>
                                            <div className="listItem"> 
                                                <Link to="/" onClick={handleButtonClick}> <div>Records</div></Link>
                                            </div>

                                
                                    </ul>
                                </DropdownMenu>
                    </div>
                </div>

            {/* Below is the Nav Bar Buttons */}
            <div className='navButton'>
            </div>

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















