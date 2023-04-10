import { useState, useEffect } from "react";
import Axios from 'axios';
import "../App.js";
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function Home(){
  const [trackList, setTrackList] = useState([]);
  const [search, setSearch] = useState('');
  console.log(search);
  useEffect(() => {
    Axios.get("http://localhost:3001/output").then((response) => {
      setTrackList(response.data);
      //console.log(JSON.stringify(response.data, null, 2))
    });
  }, []);
    return(

        <div className="container" >
            {/* This is cards that display on the homepage */}
            <Link to="/Squadranking" className="homeCard1">  
                <div><img className="homeIcon" src={require("../icons/plus-or-minus.png" )}alt="Squad Rank"/> <p>Squad Rankings</p></div>
            </Link>

            <Link to="/Indranking" className="homeCard2"> 
                <div><img className="homeIcon" src={require("../icons/trophy.png")}alt="Individual Rankings"/><p>Individual Rankings</p> </div>
            </Link>
            
            <Link to="/Meetpredictor" className="homeCard3">  
                <div><img className="homeIcon" src={require("../icons/bar-chart.png" )}  alt="Meet Predictor"/> <p>Meet Predictor</p></div>
            </Link>



            {/* This is the search bar component */}
            <div className="searchBox">
              <label>Search</label>
                <input type="text" onChange={(e) => setSearch(e.target.value)} />
                  <ul placeholder="Search a college or athlete...">
                    {trackList.filter((val) => {
                      return search.toLowerCase() === '' 
                      ? val 
                      : val.Name.toLowerCase().includes(search);
                    })
                    .map((val) => {
                      return ( 
                        <h1>
                          {val.Name}
                        </h1>
                      );
                  })}
                </ul>
            </div>


        </div>

        
    )
}