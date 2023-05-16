import React, { useState, useEffect} from "react";
import Axios from 'axios';
import DisplayHidden from "../components/DisplayHidden";
export default function Squadranking(){
    /*
        *GET RID OF IC4A_ECAC CONFERENCE IN TABLES*
    */
    const[click, setClick] = useState (false);
    const Hoverable= () => setClick(!click);

    const menEvents = ["100 Meters", "200 Meters", "400 Meters", "800 Meters", "1500 Meters", "5000 Meters"
        , "10,000 Meters", "3000 Steeplechase", "110 Hurdles", "400 Hurdles", "Shot put", "Discus", 
        "Javelin", "Hammer", "High Jump", "Long Jump", "Triple Jump", "Pole Vault", "Decathlon"];
    const womenEvents = ["100 Meters", "200 Meters", "400 Meters", "800 Meters", "1500 Meters", "5000 Meters"
    , "10,000 Meters", "3000 Steeplechase", "100 Hurdles", "400 Hurdles", "Shot put", "Discus", 
    "Javelin", "Hammer", "High Jump", "Long Jump", "Triple Jump", "Pole Vault", "Heptathlon"];

    
    const [squadList, setSquadList] = useState([]);
    const [divSelect, setDivSelect] = useState('');
    const [sexSelect, setSexSelect] = useState(''); 
    const [eventSelect, setEventSelect] = useState('');

    let sexType = null;
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

    function setEvent(e) {
        const val = e.target.value;
        if (val === "Event") {
            setEventSelect('');
        } else {
            setEventSelect(val);
        }
        console.log(val);
    }
    function setSex(e) {
        const val = e.target.value;
        if (val === "Sex") {
            setSexSelect('');
        } else {
            setSexSelect(val);
        }
        console.log(val);
    }
    if(sexSelect === "Men") {
        sexType = menEvents;
    } else if(sexSelect === "Women") {
        sexType = womenEvents;
    }
    
    if(sexType) {
        eventOptions = sexType.map((e) => <option key={e}>{e}</option>);
    }
   
    function SetResults() {
        SendCollegeRequest(divSelect, sexSelect, eventSelect);
        }
    const SendCollegeRequest = async (division, sex, event) => {
        console.log('College Request');
        try {
            if(division !== '') {
                if (sex !== '' && event !== '') {
                    const response = await Axios.get('http://localhost:3001/SquadRankings/Colleges', {
                        params: {
                            query: `SELECT College, Conference, SUM(Time_S) AS sum_time, AVG(Time_S) 
                            AS avg_time, SUM(Distance_m) AS sum_dist, AVG(Distance_m) AS avg_dist, 
                            SUM(Points) AS sum_points, AVG(Points) AS avg_points, Event_ID FROM 
                                (SELECT College, Conference, Time_S, Distance_m, Points, Event_ID, ROW_NUMBER() OVER (PARTITION BY College, Conference) 
                                    AS row_num FROM ${division} WHERE Gender = '${sex}' AND Event = '${event}'
                            ) ${division} WHERE row_num <= 4 GROUP BY College, Conference, Event_ID ORDER BY avg_time, avg_dist DESC, avg_Points DESC Limit 20;`
                        }
                    })
                    console.log(response.data);
                    setSquadList(response.data);
                } 
            }
        } catch (err) {
            console.log(err);
        }
    }

    function convertTime(seconds) {
        const totalMilliseconds = seconds * 1000;
        const minutes = Math.floor(totalMilliseconds / (1000 * 60));
        const secondsRemaining = Math.floor((totalMilliseconds % (1000 * 60)) / 1000);
        const millisecondsRemaining = Math.floor(totalMilliseconds % 1000);
       // const millisecondsRound = Math.round(millisecondsRemaining, 1)
        console.log(millisecondsRemaining)
        const millisecondsRound = Math.round(millisecondsRemaining / 10, 1)
        console.log(millisecondsRound)
        if (minutes === 0) {
            return `${secondsRemaining}.${millisecondsRound}`;
        } else {
            return `${minutes}:${secondsRemaining}.${millisecondsRound}`;
        }
    }
    return (
    <div className="homeContainer">
        <div className='squadHeader'>
            <h2> Squad Statistics </h2>
            <p>This page will allow you to view stats by school to view their best events, highest scorers, etc.
                Select a division and event to display squad rankings.
            </p>
        </div>

        <div className="squadContainer">
            <div className='filterButton'>
                <select onChange={setSex}>
                    <option>Sex</option>
                    <option>Men</option>
                    <option>Women</option>
                </select>
            </div>

            <div className='filterButton'>
                <select onChange={setEvent}>
                  <option>Event</option>
                  {eventOptions}
                </select>
            </div>

            <div className='filterButton'>
                <select onChange={setDivision}>
                    <option> Division </option>
                    <option value ='di'>Division I</option>
                    <option value ='dii'>Division II</option>
                    <option value ='diii'>Division III</option>
                </select>
            </div>

           {/*<div className='filterButton'>
                <select onChange={setConference}>
                    <option>Conference </option>
                    {confOptions}
                </select>
    </div>*/}

            <button onClick={SetResults}>
                <option>Results</option>
            </button>

            <div className='squadCard'>
                <div className="squadCard-header">
                    <h3> Rank </h3>
                    {squadList.map((val) => {
                        return (
                            <a key= {val.id} className='dataItem' href={val.link} target="_blank">
                                {}
                            </a>
                        );
                    }
                    )}  
                    <h3> College </h3>
                    {squadList.map((val) => {
                        if ((val.sum_time >= val.avg_time * 4 && val.sum_dist === 0 && val.sum_points === 0)
                        || (val.sum_dist >= val.avg_dist * 4 && val.sum_time === 0 && val.sum_points === 0)
                        || (val.sum_points >= val.avg_points * 4 && val.sum_time === 0 && val.sum_dist === 0)
                        ) {
                            return (
                                <a key= {val.id} className='dataItem' href={val.link} target="_blank">
                                    {val.College} <br></br>
                                </a>
                            );
                        }  
                    })}
                    <h3> Conference </h3>
                    {squadList.map((val) => {
                        if ((val.sum_time >= val.avg_time * 4 && val.sum_dist === 0 && val.sum_points === 0)
                        || (val.sum_dist >= val.avg_dist * 4 && val.sum_time === 0 && val.sum_points === 0)
                        || (val.sum_points >= val.avg_points * 4 && val.sum_time === 0 && val.sum_dist === 0)) {
                            return (
                                <a key= {val.id} className='dataItem' href={val.link} target="_blank">
                                    {val.Conference}
                                </a>
                            );
                        }  
                    })}
                    <h3> Total </h3> 
                        {squadList.map((val) => {
                            if (val.sum_time >= val.avg_time * 4 && val.sum_dist === 0 && val.sum_points === 0) {   
                                const convertedTime = convertTime(val.sum_time);
                                return (
                                    <a key= {val.id} className='dataItem' href={val.link} target="_blank">
                                        {convertedTime} <br></br>
                                    </a>
                                );
                            } else if (val.sum_dist >= val.avg_dist * 4 && val.sum_time === 0 && val.sum_points === 0) {   
                                return (
                                    <a key= {val.id} className='dataItem' href={val.link} target="_blank">
                                        {val.sum_dist.toFixed(2)} <br></br>
                                    </a>
                                );
                            } else if (val.sum_points >= val.avg_points * 4 && val.sum_time === 0 && val.sum_dist === 0) {
                                return (
                                    <a key= {val.id} className='dataItem' href={val.link} target="_blank">
                                        {val.sum_points.toFixed(2)} <br></br>
                                    </a>
                                );
                            }
                        })}
                    <h3> Avg. </h3> 
                        {squadList.map((val) => {
                            if (val.sum_time >= val.avg_time * 4 && val.sum_dist === 0 && val.sum_points === 0) {
                                const convertedTime = convertTime(val.avg_time);
                                return (
                                    <a key= {val.id} className='dataItem' href={val.link} target="_blank">
                                    {convertedTime} <br></br>
                                    </a>
                                );
                            } else if (val.sum_dist >= val.avg_dist * 4 && val.sum_time === 0 && val.sum_points === 0) {   
                                return (
                                    <a key= {val.id} className='dataItem' href={val.link} target="_blank">
                                        {val.avg_dist.toFixed(2)} <br></br>
                                    </a>
                                );
                            } else if (val.sum_points >= val.avg_points * 4 && val.sum_time === 0 && val.sum_dist === 0) {
                                return (
                                    <a key= {val.id} className='dataItem' href={val.link} target="_blank">
                                        {val.avg_points.toFixed(2)} <br></br>
                                    </a>
                                );
                            }
                        })}
                </div>

                <div className="squadInfo">
                    <div className="squadChildren">
                        
                        <DisplayHidden>

                            <div className="rankDiv">
                                <h3> Rank </h3>
                                
                            </div>

                            <div className="teamDiv">
                                <h3> Team </h3>
                                
                            </div>

                            <div className="confDiv">
                                <h3> Conference </h3>

                            </div>
                            <div className="scoreDiv">
                                <h3> Score </h3>
                                                            
                            </div>



                        </DisplayHidden>
                        </div>

                </div>
            </div>   
        </div>
    </div>

 
    )
}