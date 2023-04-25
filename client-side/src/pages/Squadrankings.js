import React, { useState, useEffect} from "react";
//import DropdownItems from "../components/DropdownItems";
import Axios from 'axios';
import DisplayChildrenButton from "../components/DisplayChildrenBtn";
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
            <p>This page will allow you to view stats by school to view their best events, highest scorers, etc.
                Select a division and event to display squad rankings.
            </p>
        </div>

        <div className="squadContainer">
        <div className='filterButton'>
                {/*e=>setSelectDiv(e.target.value)*/}
                <select>
                    <option>Men's</option>
                    <option>Women's</option>
                </select>
            </div>


            <div className='filterButton'>
                {/*e=>setSelectDiv(e.target.value)*/}
                <select onChange={setDivision}>
                    <option> Select Division </option>
                    <option value ='DivisionI'>Division I</option>
                    <option value ='DivisionII'>Division II</option>
                    <option value ='DivisionIII'>Division III</option>
                </select>
            </div>



            <div className='filterButton'>
                <select>
                    <option> Select Conference  </option>
                    <option >Conference I</option>
                    <option >Conference II</option>
                    <option >Conference III</option>
                </select>
            </div>



            <div className='filterButton'>
            
            {/*    <select className="womenEvents" >
                    <option> Select Event</option>
                    <option > 100m Dash</option>
                    <option > 200m Dash</option>
                    <option > 400m Dash </option>
                    <option > 800m Dash </option>
                    <option > 1500m Run </option>
                    <option > 5000m Run </option>
                    <option > 10,000m Run </option>
                    <option > 3000m Steeplechase </option>
                    <option > 100m Hurdles </option>
                    <option > 400m Hurdles </option>
                    <option > Shotput Throw </option>
                    <option > Discus Throw </option>
                    <option > Javelin Throw </option>
                    <option > Hammer Throw </option>
                    <option > High Jump </option>
                    <option > Long Jump</option>
                    <option > Triple Jump</option>
                    <option > Pole Vault</option>
                    <option > Heptathlon </option>

                    
                </select>
            */}


                <select className="manEvents" >
                    <option> Select Event  </option>
                    <option > 100m Dash</option>
                    <option > 200m Dash</option>
                    <option > 400m Dash </option>
                    <option > 800m Dash </option>
                    <option > 1500m Run </option>
                    <option > 5000m Run </option>
                    <option > 10,000m Run </option>
                    <option > 3000m Steeplechase </option>
                    <option > 110m Hurdles </option>
                    <option > 400m Hurdles </option>
                    <option > Shotput Throw </option>
                    <option > Discus Throw </option>
                    <option > Javelin Throw </option>
                    <option > Hammer Throw </option>
                    <option > High Jump </option>
                    <option > Long Jump</option>
                    <option > Triple Jump</option>
                    <option > Pole Vault</option>
                    <option > Decathlon </option>

                </select>
            </div>

            <div className='squadCard'>
                <div className="squadCard-header">
                    <h3> Rank </h3>
                    {trackList.map((val) => {
                    return (
                        <a className='dataItem' href={val.link} target="_blank">
                            {val.Rank}
                        </a>
                    );
                    }
                        )}
                    <h3> Team </h3>
                    {trackList.map((val) => {
                    return (
                        <a className='dataItem' href={val.link} target="_blank">
                            {val.Team}
                        </a>
                    );
                    }
                        )}
                    <h3> Conference </h3>
                    {trackList.map((val) => {
                    return (
                        <a className='dataItem' href={val.link} target="_blank">
                            {val.Conference}
                        </a>
                    );
                    }
                        )}
                    <h3> Score </h3> 
                    {trackList.map((val) => {
                    return (
                        <a className='dataItem' href={val.link} target="_blank">
                            {val.Time}
                            {val.Distance}
                            {val.Points}
                        </a>
                    );
                    }
                        )} 

                </div>

                <div className="squadInfo">
                    <div className="squadChildrenButton">
                        
                    <DisplayChildrenButton>
                        <h3> Rank </h3>
                        <h3> Team </h3>
                        <h3> Average </h3>
                        <h3> Conference </h3>

                    </DisplayChildrenButton>

                    </div>

                </div>
            </div>   
                    

        </div>


    </div>

 
    )
}