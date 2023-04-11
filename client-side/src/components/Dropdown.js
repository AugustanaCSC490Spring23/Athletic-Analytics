import React, { useState, useEffect } from "react";


export default function Dropdown( props ){

    const[display, setDisplay] = useState ('none');
    function handleClick(){
        if (display == 'none') {
            setDisplay('block')
        } else {
            setDisplay ('none')
        }
    }

    return(

        <div className="dropdown">
            <div>
                <div>
                    Hello World
                </div>

                <div style={{display:display}}>

                    {props.children}
                </div>







            </div>


        </div>





    )


}