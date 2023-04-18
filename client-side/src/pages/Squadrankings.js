import React, { useState, useEffect} from "react";
//import DropdownItems from "../components/DropdownItems";
import Axios from 'axios';
export default function Squadranking(){

    const[click, setClick] = useState (false);
    const Hoverable= () => setClick(!click);

    // const onMouseEnter = () = => {
    //     if(WritableStreamDefaultController.innerWidth < 960) {
    //         setDropdown(false);
    //     } else {
            
    //     }
    // }
    function setDivision(e) {
        const val = e.target.value;
       // console.log("SetDivision 1 " + selectDiv);
       // setSelectDiv(val);
        sendGetRequest(val);
       // console.log("SetDivision 2 " + selectDiv);
    }
    const [trackList, setTrackList] = useState([]);
    const sendGetRequest = async (division) => {
        try {
            const axiosLink = "http://localhost:3001/" + division;
            console.log("Send get request " + axiosLink);
            const response = await Axios.get(axiosLink);
            console.log(typeof(response.data));
            console.log("data recieved");
            console.log(response.data);
            setTrackList(response.data);  
        } catch (err) {
            console.error(err);
        } 
    }
    //useEffect(()=> {
        /* Axios.get(axiosLink).then((response) => {
            setTrackList(response.data);
            console.log(trackList);
        })
        .catch(err => {
            console.error(err);
        }); */
    //    sendGetRequest()
    //}, []);

    return (
    <div>
        <div className='squadHeader'>
            <h2> Squad Statistics </h2>
            <p>This page will allow you to view stats by school to view their best events, highest scorers, etc.</p>
        </div>

        <div className="squadContainer">
            <div className='filterButton'>
                {/*e=>setSelectDiv(e.target.value)*/}
                <select onChange={setDivision}>
                    <option>Select</option>
                    <option value ='DivisionI'>Division I</option>
                    <option value ='DivisionII'>Division II</option>
                    <option value ='DivisionIII'>Division III</option>
                </select>
            </div>



            <div className='filterButton'>
                <select >
                    <option >Conference I</option>
                    <option >Conference II</option>
                    <option >Conference III</option>
                </select>
            </div>

            <div className='filterButton'>
                <select >
                    <option >100m</option>
                    <option >Long Jump</option>
                    <option >Pole Vault</option>
                </select>
            </div>

             <div className='squadCard'>
                {trackList.map((val) => {
                    return (
                        <a className='dataItem' href={val.link} target="_blank">
                            {val.Name}
                        </a>
                    );
                    }
                )}  
            </div>  
       

        </div>


    </div>

 
    )
}