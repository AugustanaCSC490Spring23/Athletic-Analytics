import "../App.js";
import "./SchoolProfiles.css"
import React, { useState, useEffect} from "react";
import Axios from 'axios';
import Searchbar from "../components/Searchbar.js";

export default function Schoolprofiles(){
    const menEvents = ["100 Meters", "200 Meters", "400 Meters", "800 Meters", "1500 Meters", "5000 Meters"
        , "10,000 Meters", "3000 Steeplechase", "110 Hurdles", "400 Hurdles", "Shot put", "Discus", 
        "Javelin", "Hammer", "High Jump", "Long Jump", "Triple Jump", "Pole Vault", "Decathlon"];
    const womenEvents = ["100 Meters", "200 Meters", "400 Meters", "800 Meters", "1500 Meters", "5000 Meters"
    , "10,000 Meters", "3000 Steeplechase", "100 Hurdles", "400 Hurdles", "Shot put", "Discus", 
    "Javelin", "Hammer", "High Jump", "Long Jump", "Triple Jump", "Pole Vault", "Heptathlon"];
    
    const [college, setCollege] = useState('');
    const [eventSelect, setEventSelect] = useState('');
    const [sexSelect, setSexSelect] = useState(''); 
    const [athletesList, setAthletesList] = useState([]);

    const handleSearch = (value) => {
        // Use the search value for other functionalities within App.js
        // Example: Call a function, make an API request, update state, etc.
        console.log('Search value:', value);
        setCollege(value);
      };
    
    let sexType = null;
    let eventOptions = null;

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

    function setResults() {
        const sSelect = sexSelect;
        const eSelect = eventSelect;
        console.log(sSelect);
        console.log(eSelect);
        sendGetRequest(college, sSelect, eSelect);
    }

    const sendGetRequest = async (college, sex, event) => {
        try {
            if (event !== '') {
                const response = await Axios.get('http://localhost:3001/SchoolProfile', {
                        params: {
                            query: `Select * FROM di WHERE College = '${college}' AND Gender = '${sex}' AND Event = '${event}' 
                            UNION 
                            SELECT * FROM dii WHERE College = '${college}' AND Gender = '${sex}' AND Event = '${event}'
                            UNION 
                            SELECT * FROM diii WHERE College = '${college}' AND Gender = '${sex}' AND Event = '${event}';`
                        }
                })
                console.log(response.data);
                setAthletesList(response.data);
            } else if (event === '') {
                const response = await Axios.get('http://localhost:3001/SchoolProfile', {
                        params: {
                            query: `Select * FROM di WHERE College = '${college}' AND Gender = '${sex}'
                            UNION 
                            SELECT * FROM dii WHERE College = '${college}' AND Gender = '${sex}'
                            UNION 
                            SELECT * FROM diii WHERE College = '${college}' AND Gender = '${sex}';`
                        }
                })
                console.log(response.data);
                setAthletesList(response.data);
            }
        } catch (err) {
            console.log(err);
        }
    }
    return ( 


    <div className="schoolprofilesContainer">'
        <h1> School Profiles </h1>
        <p> This page allows you to search a school to see their top athletes, as well as the roster for each school's event</p>
        
        {/* need javascript to be able to input the school selection into a query that generates the school profile table */}
        
        <Searchbar onSearch={handleSearch}/>
        <div className="selectOptions">  
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
            {/* Need javascript to auto fill the number of tables needed per school selection  */}
            <div className="schoolTable">
                <div className="schoolName">{college}</div>
                <div className="schoolTableHeaders">      <h3> Event </h3>        <h3> Name </h3>     <h3> Year </h3>      <h3> Mark </h3>      <h3> Date </h3>  <h3> Wind </h3>     </div>
                {athletesList.map((val, index) => {
                    if (val.Time_I !== '') {
                        return (
                            <div key={index} className='dataRow'>
                                <p key={val.id} className='stat' href={val.link} target="_blank">{val.Event}</p>
                                <p key={val.id} className='stat' href={val.link} target="_blank">{val.Athlete}</p>
                                <p key={val.id} className='stat' href={val.link} target="_blank">{val.Year}</p>
                                <p key={val.id} className='stat' href={val.link} target="_blank">{val.College}</p>
                                <p key={val.id} className='stat' href={val.link} target="_blank">{val.Time_I}</p>
                                <p key={val.id} className='stat' href={val.link} target="_blank">{val.Meet_Date}</p>
                                <p key={val.id} className='stat' href={val.link} target="_blank">{val.Wind}</p>
                            </div>
                        );
                    } else if (val.Distance_m !== 0) {
                        return (
                            <div key={index} className='dataRow'>
                                <p key={val.id} className='stat' href={val.link} target="_blank">{val.Event}</p>
                                <p key={val.id} className='stat' href={val.link} target="_blank">{val.Athlete}</p>
                                <p key={val.id} className='stat' href={val.link} target="_blank">{val.Year}</p>
                                <p key={val.id} className='stat' href={val.link} target="_blank">{val.College}</p>
                                <p key={val.id} className='stat' href={val.link} target="_blank">{val.Distance_m}</p>
                                <p key={val.id} className='stat' href={val.link} target="_blank">{val.Meet_Date}</p>
                                <p key={val.id} className='stat' href={val.link} target="_blank">{val.Wind}</p>
                            </div>
                        );
                    } else if (val.Points !== 0) {
                        return (

                            <div key={index}  className='dataRow'>
                                <p key={val.id} className='stat' href={val.link} target="_blank">{val.Event}</p>
                                <p key={val.id} className='stat' href={val.link} target="_blank">{val.Athlete}</p>
                                <p key={val.id} className='stat' href={val.link} target="_blank">{val.Year}</p>
                                <p key={val.id} className='stat' href={val.link} target="_blank">{val.College}</p>
                                <p key={val.id} className='stat' href={val.link} target="_blank">{val.Points}</p>
                                <p key={val.id} className='stat' href={val.link} target="_blank">{val.Meet_Date}</p>
                                <p key={val.id} className='stat' href={val.link} target="_blank">{val.Wind}</p>
                            </div>
                        );
                    }
                })}     

            </div>


    
    
    
    
    </div>
)}