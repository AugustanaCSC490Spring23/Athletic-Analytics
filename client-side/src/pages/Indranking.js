import React, { useState, useEffect} from "react";
import Axios from 'axios';
export default function Indranking(){
    const D3confNames =['American_Rivers', 'American_Southwest', 'Atlantic_East', 'CCIW', 'CCS', 'Centennial_Conference', 'Coast-to-Coast', 'Commonwealth_Coast', 'CSAC', 
    'CUNYAC','Empire_8', 'Great_Northeast', 'HCAC', 'Landmark_Conference', 'Liberty_League', 'Little_East', 'MASCAC', 'MIAC', 'Michigan_Intercollegiate', 
    'Middle_Atlantic', 'Midwest_Conference', 'NACC', 'NESCAC', 'NEWMAC', 'NJAC', 'North_Atlantic_Conference', 'North_Coast_AC', 'Northwest_Conference', 
    'OAC', 'ODAC', 'Presidents_AC', 'SAA', 'SCAC', 'SCIAC', 'SLIAC', 'SUNYAC', 'UAA', 'UMAC', 'USA_South', 'WIAC'];

    const D2confNames = ['CACC', 'CCAA', 'CIAA', 'Conference_Carolinas', 'ECC', 'G-MAC', 'GLIAC', 'GLVC', 'GNAC', 'Great_American', 'Gulf_South', 'Lone_Star', 
    'MIAA', 'Mountain_East', 'Northeast-10', 'Northern_Sun', 'PacWest', 'Peach_Belt', 'PSAC', 'RMAC', 'SIAC', 'South_Atlantic'];

    const D1confNames = ['ACC', 'America_East', 'ASUN', 'Atlantic_10', 'Big_12', 'BIG_EAST', 'Big_Sky', 'Big_South', 'Big_Ten', 'Big_West', 
    'CAA_(Colonial)', 'Conference_USA','Horizon_League', 'Ivy_League', 'MEAC', 'Metro_Atlantic_(MAAC)', 'Mets', 
    'Mid-American_(MAC)', 'Missouri_Valley_(MVC)', 'Mountain_West', 'Northeast_Conference', 'Ohio_Valley_(OVC)', 'Pac-12', 
    'Patriot_League', 'SEC', 'Southern_Conference', 'Southland_Conference', 'Sun_Belt', 'SWAC', 'The_American', 'The_Summit_League', 'WAC'];

    const menEvents = ["100 Meters", "200 Meters", "400 Meters", "800 Meters", "1500 Meters", "5000 Meters"
        , "10,000 Meters", "3000 Steeplechase", "110 Hurdles", "400 Hurdles", "Shot put", "Discus", 
        "Javelin", "Hammer", "High Jump", "Long Jump", "Triple Jump", "Pole Vault", "Decathlon"];
    const womenEvents = ["100 Meters", "200 Meters", "400 Meters", "800 Meters", "1500 Meters", "5000 Meters"
    , "10,000 Meters", "3000 Steeplechase", "100 Hurdles", "400 Hurdles", "Shot put", "Discus", 
    "Javelin", "Hammer", "High Jump", "Long Jump", "Triple Jump", "Pole Vault", "Heptathlon"];

    
    const [divList, setDivList] = useState([]);
    const [divSelect, setDivSelect] = useState('');
    const [sexSelect, setSexSelect] = useState(''); 
    const [confSelect, setConfSelect] = useState('');
    const [eventSelect, setEventSelect] = useState('');

    let confType = null;
    let confOptions = null;
    let sexType = null;
    let eventOptions = null;

    function setDivision(e) {
        const val = e.target.value;
        if (val === "Division") {
            setDivSelect('');
        } else {
            setDivSelect(val);
            setConfSelect('');
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

    if(divSelect === "di") {
        confType = D1confNames; //Division 1 conferences
    } else if(divSelect === "dii") {
        confType = D2confNames; //Division 2 conferences
    } else if(divSelect === "diii") {
        confType = D3confNames; //Division 3 conferences
    }

    if(confType) {
        confOptions = confType.map((e) => <option key={e}>{e}</option>);
    }
    function setResults() {
        const dSelect = divSelect;
        const cSelect = confSelect;
        const sSelect = sexSelect;
        const eSelect = eventSelect;
        console.log(dSelect);
        console.log(cSelect);
        console.log(sSelect);
        console.log(eSelect);
        sendGetRequest(dSelect, cSelect, sSelect, eSelect);
    }
    const sendGetRequest = async (division, conference, sex, event) => {
        try {
            if (conference !== '') {
                if (sex !== '' && event !== '') {
                    const response = await Axios.get('http://localhost:3001/IndivRankings', {
                        params: {
                            query: `SELECT * FROM ${division} WHERE Conference = '${conference}' AND Gender = '${sex}' AND Event = '${event}' ORDER BY Time_S, Distance_m DESC, Points DESC`
                        }
                    })
                    setDivList(response.data);
                } else if (sex !== '' && event === '') {
                    const response = await Axios.get('http://localhost:3001/IndivRankings', {
                        params: {
                            query: `SELECT * FROM ${division} WHERE Conference = '${conference}' AND Gender = '${sex}' ORDER BY Event_ID, Time_S, Distance_m DESC, Points DESC LIMIT 50`
                        }
                    })
                    setDivList(response.data);
                } else {
                    const response = await Axios.get('http://localhost:3001/IndivRankings', {
                        params: {
                            query: `SELECT * FROM ${division} WHERE Conference = '${conference}' ORDER BY Event_ID, Time_S, Distance_m DESC, Points DESC LIMIT 50`
                        }
                    })
                    setDivList(response.data);
                }
            } else if (conference === '') {
                if (sex !== '' && event !== '') {
                    const response = await Axios.get('http://localhost:3001/IndivRankings', {
                        params: {
                            query: `SELECT * FROM ${division} WHERE Gender = '${sex}' AND Event = '${event}' ORDER BY Time_S, Distance_m DESC, Points DESC LIMIT 50`
                        }
                    })
                    setDivList(response.data);
                } else if (sex !== '' && event === '') {
                    const response = await Axios.get('http://localhost:3001/IndivRankings', {
                        params: {
                            query: `SELECT * FROM ${division} WHERE Gender = '${sex}' ORDER BY Event_ID, Time_S, Distance_m DESC, Points DESC LIMIT 50`
                        }
                    })
                    setDivList(response.data);
                } else {
                    const response = await Axios.get('http://localhost:3001/IndivRankings', {
                        params: {
                            query: `SELECT * FROM ${division} ORDER BY Event_ID, Time_S, Distance_m DESC, Points DESC LIMIT 50`
                        }
                    })
                    setDivList(response.data);
                }
            }
        } catch (err) {
            console.log(err);
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
                        <option value ='di'>Division I</option>
                        <option value ='dii'>Division II</option>
                        <option value ='diii'>Division III</option>
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
                    <select onChange={setSex}>
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

                <button onClick={setResults}>
                    <option>Results</option>
                </button>
                
            </div>

            <div className="eventTable-title">
                <h1>{eventSelect}</h1>
            </div>


            <div className="eventTable">
                    <div className="tableStat">
                        
                        <div className="stat-headers">
                            <h3> Rank </h3>
                            <h3> Athlete </h3>
                            <h3> Year </h3>
                            <h3> College </h3>
                            <h3> Mark </h3>                            
                            <h3> Date </h3>
                            <h3> Wind </h3>
                        </div>

                        {divList.map((val, index) => {
                            let value = '';
                            if (val.Time_I !== '') {
                                value = val.Time_I;
                            } else if (val.Distance_m !== 0) {
                                value = val.Distance_m + 'm';
                            } else if (val.Points !== 0) {
                                value = val.Points;
                            }
                            return (
                                <div key={index} className='dataRow'>
                                    <a key= {val.id} className='stat' href={val.link} target="_blank"><p>{index + 1}</p></a>
                                    <a key= {val.id} className='stat' href={val.link} target="_blank"><p>{val.Athlete}</p></a>                                   
                                    <a key= {val.id} className='stat' href={val.link} target="_blank"><p>{val.Year}</p></a> 
                                    <a key= {val.id} className='stat' href={val.link} target="_blank"><p>{val.College}</p></a> 
                                    <a key= {val.id} className='stat' href={val.link} target="_blank"><p>{value}</p></a> 
                                    <a key= {val.id} className='stat' href={val.link} target="_blank"><p>{val.Meet_Date}</p></a> 
                                    <a key= {val.id} className='stat' href={val.link} target="_blank"><p>{val.Wind}</p></a> 
                                </div>
                            );
                        }
)}         
                    </div>
            </div>

        </div>








    )
    
    
    
    
    
}