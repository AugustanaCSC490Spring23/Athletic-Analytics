import React, { useState, useEffect } from "react";
import DropdownItem from "./DropdownItem";

export default function DropdownMenu( props ){

    const[click, setClick] = useState (false);
    const handleClick= () => setClick(!click);
    

    return(

        <NavButton onClick={handleClick}/>




    )


}

