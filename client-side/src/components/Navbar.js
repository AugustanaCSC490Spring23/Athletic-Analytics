import React, { useState } from "react";
import "./Navbar.css"
import { Link } from 'react-router-dom';
import navButton from "./NavButton.js";
import DropdownMenu from './DropdownMenu.js';
import handleButtonClick from "./DropdownMenu.js";
import home from "../icons/homeIcon.png";


export default function Navbar() {
    return (
        <div className="navbar">
            <div className="navbarItems">
                <div className="navMenu">
                    {/* Below is the HamburgerMenu on Nav Bar */}
                    <div className="DropdownButtonContainer"   >
                        <DropdownMenu>
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
                            </ul>
                        </DropdownMenu>
                    </div>
                </div>
                {/* Below is the Nav Bar Buttons */}
                <div className='navButton'>
                    <Link to="/home" onClick={handleButtonClick}><img src={home} /></Link>
                </div>
                <div className='navButton'>
                    <Link to="/features" onClick={handleButtonClick}>Features</Link>
                </div>
                <div className='navButton'>
                    <Link to="/faq" onClick={handleButtonClick}>FAQ</Link>
                </div>
                <div className='navButton'>
                    <Link to="/about" onClick={handleButtonClick}>About</Link>
                </div>
            </div>
        </div>

    )
}















