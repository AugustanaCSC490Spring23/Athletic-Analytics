import React, { useState } from "react";

const DisplayChildrenButton = ({ children }) => {
  const [showChildren, setShowChildren] = useState(false);

  const handleButtonClick = () => {
    setShowChildren(!showChildren);
  };

  return (
    <div className="childrenButton">
      <button onClick={handleButtonClick}><img src="BurgerMenuIcon"></img></button>
      {showChildren && children}
    </div>
  );
};

export default DisplayChildrenButton;
