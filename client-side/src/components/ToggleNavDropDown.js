import React, { useState } from "react";
import burger from "../icons/burgerIcon.png";

  const ToggleNavDropDown = ({ children }) => {
  const [showChildren, setShowChildren] = useState(false);

  const handleButtonClick = () => {
    setShowChildren(!showChildren);
  };

  return (
    <div className="navDropdown">
      <button onClick={handleButtonClick}><img className="burger" src={burger} alt="burgerIcon"/></button>
      {showChildren && children}
    </div>
  );
};

export default ToggleNavDropDown;
