import "../App.js";
import React, { useState, useEffect} from "react";


export default function Schoolprofiles(){
    return ( <div className="schoolprofilesContainer">'
        <h1> School Profiles </h1>
        <p> This page allows you to search a school to see their top athletes, as well as the roster for each school's event</p>

        <div className="topAthleteTable">                               </div>
        <div className="eventSelectTable">  
            <div className='filterButton'>
                <h2> Select an Event: </h2>
                {/* <select className="Events" placeholder="Event" onChange={setEvent} >
                    <option>Event</option>
                    {eventOptions}
                </select> */}
            </div>

            <div className="eventDetails">
                <div className="EventHeader">       <h3> Rank </h3>        <h3> Name </h3>     <h3> Year </h3>      <h3> Mark </h3>      <h3> Date </h3>       </div>
                {/* {divList.map((val) => {
                            return (
                                <div className='dataRow'>
                                    <a className='stat' href={val.link} target="_blank"><p>{val.Rank}</p></a>
                                    <a className='stat' href={val.link} target="_blank"><p>{val.Athlete}</p></a>                                   
                                    <a className='stat' href={val.link} target="_blank"><p>{val.Year}</p></a> 
                                    <a className='stat' href={val.link} target="_blank"><p>{val.Time}{val.Distance}{val.Points}</p></a> 
                                    <a className='stat' href={val.link} target="_blank"><p>{val.Meet_Date}</p></a> 
                                </div>
                            );
                            }
                        )}         
 */}

            </div>
        
        
        </div>


    
    
    
    
    </div>
)}