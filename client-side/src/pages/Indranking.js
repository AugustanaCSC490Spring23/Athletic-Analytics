import React, { useState, useEffect} from "react";
import Axios from 'axios';
export default function Indranking(){
    const D3confNames =["AARTFC", 'American_Rivers', 'CAC', "CC", 'CCIW', "CSAC", "CCC", "E8", "GNAC", "HCHC", "IIAC"
, "LC", 'LL', "LEC", "MIAA", "MAC", "MWC", "MIAC", "NECC", "NESCAC", "NAC", "NCAC", "NEAC", "NACC",
"NWC", "OAC", "ODAC"];

    const menEvents = ["100m Dash", "200m Dash", "400m Dash", "800m Dash", "1500m Run", "5000m Run"
        , "10,000m Run", "3000m Steeplechase", "110m Hurdles", "400m Hurdles", "Shotput Throw", "Discus Throw", 
        "Javelin Throw", "Hammer Throw", "High Jump", "Long Jump", "Triple Jump", "Pole Vault", "Decathlon"];
    const womenEvents = ["100m Dash", "200m Dash", "400m Dash", "800m Dash", "1500m Run", "5000m Run"
        , "10,000m Run", "3000m Steeplechase", "100m Hurdles", "400m Hurdles", "Shotput Throw", "Discus Throw", 
        "Javelin Throw", "Hammer Throw", "High Jump", "Long Jump", "Triple Jump", "Pole Vault", "Heptathlon"];

    
    const [divList, setDivList] = useState([]);
    const [divSelect, setDivSelect] = useState("");
    const [genSelect, setGenSelect] = useState('');    

    let divType = null;
    let confOptions = null;
    let genType = null;
    let eventOptions = null;

    function setDivision(e) {
        const val = e.target.value;
        setDivSelect(val);
     //   setConference(val);
        sendGetRequest(val);
    }
    function setGender(e) {
        setGenSelect(e.target.value);
    }

    if(genSelect === "Men") {
        genType = menEvents;
    } else if(genSelect === "Women") {
        genType = womenEvents;
    }
    
    if(genType) {
        eventOptions = genType.map((e) => <option key={e}>{e}</option>);
    }

    if(divSelect === "DivisionI") {
        divType = null; //Division 1 conferences
    } else if(divSelect === "DivisionII") {
        divType = null; //Division 2 conferences
    } else if(divSelect === "DivisionIII") {
        divType = D3confNames;
    }

    if(divType) {
        confOptions = divType.map((e) => <option key={e}>{e}</option>);
    }


    const sendGetRequest = async (division) => {
        
        try {
            const axiosLink = "http://localhost:3001/" + division;
            console.log("Send get request " + axiosLink);
            const response = await Axios.get(axiosLink); 
            console.log(typeof(response.data));
            console.log("data recieved");
            console.log(response.data);
            setDivList(response.data);  
        } catch (err) {
            console.error(err);
        } 
    }
   
    return (
        <div className="indContainer">
            
            <div className='indHeader'>
                <h2> Individual Statistics </h2>
                <p>This page will allow you to view an individual athlete's recorded stats for each of their events and how they rank in their conference
                </p>
            </div>
            <div className="selectOptions">
                <div className='filterButton'>
                    {/*e=>setSelectDiv(e.target.value)*/}
                    <select onChange={setDivision}>
                        <option> Division </option>
                        <option value ='DivisionI'>Division I</option>
                        <option value ='DivisionII'>Division II</option>
                        <option value ='DivisionIII'>Division III</option>
                    </select>
                </div>

                <div className='filterButton'>
                    <select>
                        <option>Conference</option>
                        {confOptions}
                    </select>
                </div>

                <div className='filterButton'>
                    {/*e=>setSelectDiv(e.target.value)*/}
                    <select onChange={setGender}>
                        <option>Men & Women</option>
                        <option>Men</option>
                        <option>Women</option>
                    </select>
                </div>

                <div className='filterButton'>
                    <select className="Events" placeholder="Event" >
                        <option>Event</option>
                        {eventOptions}
                    </select>
                </div>


            </div>
            <div className="eventTable-header">
                <h1> Event: </h1>

            </div>
            <div className="eventTable">
                    <div className="tableStat">
                        <h3> Rank </h3>
                        {divList.map((val) => {
                            return (
                                <a className='dataItem' href={val.link} target="_blank">
                                    {val.Rank}
                                </a>
                            );
                            }
                        )}         
                    </div>

                    <div className="tableStat">
                        <h3> Athlete </h3>
                        {divList.map((val) => {
                            return (
                                <a className='dataItem' href={val.link} target="_blank">
                                    {val.Athlete}
                                </a>
                            );
                        }
                        )}
                    </div>

                    <div className="tableStat">
                        <h3> Year </h3>
                        {divList.map((val) => {
                            return (
                                <a className='dataItem' href={val.link} target="_blank">
                                    {val.Year}
                                </a>
                            );
                            }
                        )}
                                                    
                    </div>

                    <div className="tableStat">
                        <h3> Team </h3>
                        {divList.map((val) => {
                            return (
                                <a className='dataItem' href={val.link} target="_blank">
                                    {val.Team}
                                </a>
                            );
                            }
                        )}                       
                    </div>

                    <div className="tableStat">
                        <h3> Mark </h3>
                        {divList.map((val) => {
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

                    <div className="tableStat">
                        <h3> Date </h3>
                        {divList.map((val) => {
                            return (
                                <a className='dataItem' href={val.link} target="_blank">
                                    {val.Meet_Date}
                                </a>
                            );
                            }
                        )}                           
                    </div>

                    <div className="tableStat">
                        <h3> Wind </h3>
                        {divList.map((val) => {
                            return (
                                <a className='dataItem' href={val.link} target="_blank">
                                    {val.Wind}
                                </a>
                            );
                            }
                        )}                     
                    </div>




                






            </div>

        </div>








    )
    
    
    
    
    
}