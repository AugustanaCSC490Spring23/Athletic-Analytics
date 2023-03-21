import { useState } from "react"
import mockDB from "../mockDB"
import "../App.js"
import { Link, useMatch, useResolvedPath } from 'react-router-dom';


const getFilteredItems = (query, items) => {
    if (!query) {
      return items.filter((song) => song.name.includes("  "));
    }
    return items.filter((song) => song.name.includes(query));
  };
  

export default function Home(){
    const [query, setQuery] = useState("");

    const { tracks } = mockDB;
    const { items } = tracks;
    // items looks like this: [{name: 'name1'}, {name: 'name2'}]
  
    const filteredItems = getFilteredItems(query, items);
  
  
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
                <input type="text" onChange={(e) => setQuery(e.target.value)} />
                 <ul placeholder="Search a college or athlete...">
                            {filteredItems.map((value) => (
                        <h1 key={value.name}>{value.name}</h1>
                            ))}
                </ul>
            </div>


        </div>

        
    )
}