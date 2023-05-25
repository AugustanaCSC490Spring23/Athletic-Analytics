import React, { useState } from "react";
import "./DropdownMenu.css"
import burger from "../icons/burgerIcon.png";

  const ToggleNavDropDown = ({ children }) => {
  const [showChildren, setShowChildren] = useState(false);

  const handleButtonClick = () => {
    setShowChildren(!showChildren);
  };


  // Currently working on code to style navBar animation.
  // window.addEventListener('click', function() {
  // if(menuButton.style.display === "none"){
  //   menuButton.style.display = "block"; // shows menu items
  //   menuButton.

  // }

  //   var homeLogo = document.getElementById('homeLogo');
    
  //   // fade-in for home logo
  //   homeLogo.style.opacity = '1';
  
  // });
  
  

  return (
    <div className="navDropdown">
      <button id='menuButton' onClick={handleButtonClick}><img className="burger" src={burger} alt="burgerIcon"/></button>
      {showChildren && children}
    </div>
  );
};

export default ToggleNavDropDown;
