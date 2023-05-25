import React, { useState } from "react";
import "./Navbar.css"
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import navButton from "./NavButton.js";
import DropdownMenu from './DropdownMenu.js';
import handleButtonClick from "./DropdownMenu.js";
import home from "../icons/homeIcon.png";

window.addEventListener('load', function() {
    
    var fade1 = document.getElementById('fade1');
    fade1.style.opacity = '1'

    var fade2 = document.getElementById('fade2');
    fade2.style.opacity = '1'


    var featureCard1 = document.getElementById('featureCard1');
    featureCard1.style.opacity = '1'

    var featureCard2 = document.getElementById('featureCard2');
    featureCard2.style.opacity = '1'

    var featureCard3 = document.getElementById('featureCard3');
    featureCard3.style.opacity = '1'

    var featureCard4 = document.getElementById('featureCard4');
    featureCard4.style.opacity = '1'

    var featureCard5 = document.getElementById('featureCard5');
    featureCard5.style.opacity = '1'
  
  });


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

                                
                                    </ul>
                                </DropdownMenu>
                    </div>
                </div>

            {/* Below is the Nav Bar Buttons */}
            <div className='navButton'>
                <Link to="/home" onClick={handleButtonClick}><img src={home}/></Link>

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















