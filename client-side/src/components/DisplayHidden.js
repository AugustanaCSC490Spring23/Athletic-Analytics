import React, { useState } from "react";

const DisplayHidden = ({ children }) => {
const [showChildren, setShowChildren] = useState(false);

const handleButtonClick = () => {
    setShowChildren(!showChildren);
};

return (
    <div className="showChildren">
      <div onClick={handleButtonClick}></div>
      {showChildren && children}
    </div>
  );};

export default DisplayHidden;
