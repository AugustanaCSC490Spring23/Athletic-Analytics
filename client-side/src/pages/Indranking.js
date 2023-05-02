import React, { useState, useEffect} from "react";
import Axios from 'axios';
export default function Indranking(){
    const D3confNames =["AARTFC", 'American_Rivers', 'American_Southwest', "Atlantic_East", 'CCIW', "CCS", 
    "CSAC", "CUNYAC", "Centennial_Conference", "Coast-to-Coast", 'Commonwealth_Coast', "Empire_8", "Great_Northeast"];

    const menEvents = ["100 Meters", "200 Meters", "400 Meters", "800 Meters", "1500 Meters", "5000 Meters"
        , "10,000 Meters", "3000 Steeplechase", "110 Hurdles", "400 Hurdles", "Shot put", "Discus", 
        "Javelin", "Hammer", "High Jump", "Long Jump", "Triple Jump", "Pole Vault", "Decathlon"];
    const womenEvents = ["100 Meters", "200 Meters", "400 Meters", "800 Meters", "1500 Meters", "5000 Meters"
    , "10,000 Meters", "3000 Steeplechase", "100 Hurdles", "400 Hurdles", "Shot put", "Discus", 
    "Javelin", "Hammer", "High Jump", "Long Jump", "Triple Jump", "Pole Vault", "Heptathlon"];

    
    const [divList, setDivList] = useState([]);
    const [divSelect, setDivSelect] = useState('');
    const [genSelect, setGenSelect] = useState(''); 
    const [confSelect, setConfSelect] = useState('');
    const [eventSelect, setEventSelect] = useState('');

    let confType = null;
    let confOptions = null;
    let genType = null;
    let eventOptions = null;

    function setDivision(e) {
        const val = e.target.value;
        if (val === "Division") {
            setDivSelect('');
        } else {
            setDivSelect(val);
        }
        console.log(val);
    }
    function setConference(e) {
        const val = e.target.value;
        if (val === "Conference") {
            setConfSelect('');
        } else {
            setConfSelect(val);
        }
        console.log(val);
    }
    function setEvent(e) {
        const val = e.target.value;
        if (val === "Event") {
            setEventSelect('');
        } else {
            setEventSelect(val);
        }
        console.log(val);
    }
    function setGender(e) {
        const val = e.target.value;
        if (val === "Sex") {
            setGenSelect('');
        } else {
            setGenSelect(val);
        }
        console.log(val);
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
        confType = null; //Division 1 conferences
    } else if(divSelect === "DivisionII") {
        confType = null; //Division 2 conferences
    } else if(divSelect === "DivisionIII") {
        confType = D3confNames;
    }

    if(confType) {
        confOptions = confType.map((e) => <option key={e}>{e}</option>);
    }
    function setResults(e) {
        const val = e.target.value;
        if(val === "Results") {
            const dSelect = divSelect;
            const cSelect= confSelect;
            const gSelect = genSelect;
            const eSelect = eventSelect;
            console.log(dSelect);
            console.log(cSelect);
            console.log(gSelect);
            console.log(eSelect);
            sendGetRequest(dSelect, cSelect, gSelect, eSelect);
        }
    }
    const sendGetRequest = async (division, conference, gender, event) => {
        try {
            if (division === 'DivisionIII') {
                if (conference !== '') {
                    if (gender !== '' && event !== '') {
                        const response = await Axios.get('http://localhost:3001/IndivRankings/DIII', {
                            params: {
                                query: `SELECT * FROM DIII WHERE Conference = '${conference}' AND Gender = '${gender}' AND Event = '${event}' LIMIT 10`
                            }
                        })
                        setDivList(response.data);
                    } else if (gender !== '' && event === '') {
                        const response = await Axios.get('http://localhost:3001/IndivRankings/DIII', {
                            params: {
                                query: `SELECT * FROM DIII WHERE Conference = '${conference}' AND Gender = '${gender}' LIMIT 10`
                            }
                        })
                        setDivList(response.data);
                    } else {
                        const response = await Axios.get('http://localhost:3001/IndivRankings/DIII', {
                            params: {
                                query: `SELECT * FROM DIII WHERE Conference = '${conference}' LIMIT 10`
                            }
                        })
                        setDivList(response.data);
                    }
                } else {
                    if (gender !== '' && event !== '') {
                        const response = await Axios.get('http://localhost:3001/IndivRankings/DIII', {
                            params: {
                                query: `SELECT * FROM DIII WHERE Gender = '${gender}' AND Event = '${event}' LIMIT 10`
                            }
                        })
                        setDivList(response.data);
                    } else if (gender !== '' && event === '') {
                        const response = await Axios.get('http://localhost:3001/IndivRankings/DIII', {
                            params: {
                                query: `SELECT * FROM DIII WHERE Gender = '${gender}' LIMIT 10`
                            }
                        })
                        setDivList(response.data);
                    } else {
                        const response = await Axios.get('http://localhost:3001/IndivRankings/DIII', {
                            params: {
                                query: `SELECT * FROM DIII LIMIT 10`
                            }
                        })
                        setDivList(response.data);
                    }
                }
            } 
        } catch (err) {
            console.log(err);
        }
    }
      
      
        /*  try {
            if (division === 'DivisionIII') {
                const response = await Axios.get('http://localhost:3001/IndivRankings/DIII', {
                    params: {
                        query: 'SELECT * FROM DIII LIMIT 10'
                    }
                })
                console.log(typeof(response.data));
                console.log('data retrieved');
                console.log(response.data);
                setDivList(response.data);        
            }
            else {
                const response = await Axios.get('http://localhost:3001/');
                console.log("Blank list recieved");
                console.log(response.data);
                setDivList(response.data);
            } */
  /*  const sendGetRequest = async (division) => {
        
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
    }*/
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
                    <select onChange={setConference}>
                        <option>Conference</option>
                        {confOptions}
                    </select>
                </div>

                <div className='filterButton'>
                    {/*e=>setSelectDiv(e.target.value)*/}
                    <select onChange={setGender}>
                        <option>Sex</option>
                        <option>Men</option>
                        <option>Women</option>
                    </select>
                </div>

                <div className='filterButton'>
                    <select className="Events" placeholder="Event" onChange={setEvent} >
                        <option>Event</option>
                        {eventOptions}
                    </select>
                </div>

                <div className='filterButton'>
                    <select onChange={setResults} >
                        <option></option>
                        <option>Results</option>
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