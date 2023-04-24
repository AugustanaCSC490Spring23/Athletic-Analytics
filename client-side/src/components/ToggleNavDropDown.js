import React, { useState } from "react";
import burgerIcon from "../icons/burger-icon.png";

  const ToggleNavDropDown = ({ children }) => {
  const [showChildren, setShowChildren] = useState(false);

  const handleButtonClick = () => {
    setShowChildren(!showChildren);
  };

  return (
    <div className="navDropdown">

      <button onClick={handleButtonClick}><img src="burgerIcon"></img></button>
      {showChildren && children}
    </div>
  );
};

export default ToggleNavDropDown;
