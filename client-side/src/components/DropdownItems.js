import React, { useState, useEffect } from "react";
import Axios from 'axios';
import Squadranking from "../pages/Squadrankings";

export default function DropdownItems() {
    const [trackList, setTrackList] = useState([]);

    //const value = e.target.value;
    //const filteredDiv = value === '' ?
    //value: value.filter((p) => p.Team === value); 
   // setSelectDiv(value);
    //const specDiv = selectDiv;
    //console.log(specDiv);
    const axiosLink = "http://localhost:3001/" + value;
   // console.log(axiosLink);
    useEffect(() => {
        Axios.get(axiosLink).then((response) => {
            setTrackList(response.data);
            //console.log(JSON.stringify(response.data, null, 2));
        })
        .catch(err => {
            console.error(err);
        });
    }, []);
    return (
        <div className='squadCard'> 
                {trackList.map((p) => (
                    <div>{p.Name}</div>
                ))}
            </div>
    )
}
