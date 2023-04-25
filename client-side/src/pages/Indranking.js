import React, { useState, useEffect} from "react";
import Axios from 'axios';
export default function Indranking(){
  /*  const D3confNames =["AARTFC", 'ARC', 'CAC', "CC", 'CCIW', "CSAC", "CCC", "E8", "GNAC", "HCHC", "IIAC"
, "LC", 'LL', "LEC", "MIAA", "MAC", "MWC", "MIAC", "NECC", "NESCAC", "NAC", "NCAC", "NEAC", "NACC",
"NWC", "OAC", "ODAC"]; */
    
    function setDivision(e) {
        const val = e.target.value;
     //   setConference(val);
        sendGetRequest(val);
    }
  /*  function setConference(division) {
        return (); 

    } */
    const [divList, setDivList] = useState([]);

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
                <p>This page will allow you to view stats by school to view their best events, highest scorers, etc.
                    Select a division and event to display squad rankings.
                </p>
            </div>

            <div className="selectOptions">
                <div className='filterButton'>
                    {/*e=>setSelectDiv(e.target.value)*/}
                    <select >
                        <option>Men's</option>
                        <option>Women's</option>
                    </select>
                </div>


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
                        <option> Conference  </option>
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


                    <select className="manEvents" placeholder="Event" >
                        
                        <option> Event </option>
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


            </div>
            <div className="eventTable-header">
                <h1> Event </h1>

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