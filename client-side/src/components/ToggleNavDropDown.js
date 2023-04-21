import React, { useState } from "react";

  const ToggleNavDropDown = ({ children }) => {
  const [showChildren, setShowChildren] = useState(false);

  const handleButtonClick = () => {
    setShowChildren(!showChildren);
  };

  return (
    <div className="navDropdown">
      <button onClick={handleButtonClick}><img src="BurgerMenuIcon"></img></button>
      {showChildren && children}
    </div>
  );
};

export default ToggleNavDropDown;
