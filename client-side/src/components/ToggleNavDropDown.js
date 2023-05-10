import React, { useState } from "react";
import logo from "../icons/AALogo.png";

  const ToggleNavDropDown = ({ children }) => {
  const [showChildren, setShowChildren] = useState(false);

  const handleButtonClick = () => {
    setShowChildren(!showChildren);
  };

  return (
    <div className="navDropdown">
      <button onClick={handleButtonClick}><img className="navLogo" src={logo} alt="AALogo"/></button>
      {showChildren && children}
    </div>
  );
};

export default ToggleNavDropDown;
