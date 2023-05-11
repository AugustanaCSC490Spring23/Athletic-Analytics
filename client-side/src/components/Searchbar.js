import React, { useState, useEffect } from "react";
import Axios from 'axios';
import DisplayHidden from "./DisplayHidden";

//import SearchIcon from '@mui/icons-material/Search';

export default function Searchbar(){

    const [trackList, setTrackList] = useState([]);
    const [search, setSearch] = useState('');
    var searchList = [];
   // console.log(search);
    useEffect(() => {
      Axios.get("http://localhost:3001/DivisionIII").then((response) => {
        setTrackList(response.data);
        console.log(response.data);
        //console.log(JSON.stringify(response.data, null, 2))
      });
    }, []);
      return(

        <div className="searchbar">
            
                <div className="searchInputs">
                    <input type="text" placeholder="Search an Athlete..." onChange={(e) => setSearch(e.target.value)} />
                    <div className ='searchIcon'>
                        {/* <SearchIcon/> */}
                    </div >

                    <div className="searchbar-results">
                    {/*Need to create logic statement removing duplicates
                    
                    !searchList.includes(val.Athlete) &&




                    searchList uses a push function to add to the list in react.js
                    
                    
                    
                    */} 
                            {search.length != 0 && 
                            trackList.filter((val) => {
                            
                            return search.toLowerCase() === '' 
                            ? val 
                            : val.College.toLowerCase().includes(search);
                            }).map((val) => {

                                return ( 
                                <a >
                                    <p className='dataItem' href={val.link} target="_blank">
                                        {val.College}
                                    </p>
                                </a>
                                    );
                                })}


                    </div>
                        
                </div>
            


        </div>

    )
}