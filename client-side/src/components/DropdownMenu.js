/* So far this component is unused. 
I found an easier way to do it through HTML but 
this may be needed later */


import React, { useState, useEffect } from "react";
import {DropdownItems} from "./DropdownItems";

export default function DropdownMenu(  ){

    const[click, setClick] = useState (false);
    const handleClick= () => setClick(!click);
    

    return(

        <ul className='DropdownMenu' >
                {DropdownItems.map((item) => {
                    return( 
                        <li key={item.id}>
                            {item.title}
                        </li>
                    )
                })}

        </ul>


    )


}

