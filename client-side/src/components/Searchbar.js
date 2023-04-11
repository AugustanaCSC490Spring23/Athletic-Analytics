import React, { useState, useEffect } from "react";
import Axios from 'axios';

//import SearchIcon from '@mui/icons-material/Search';

export default function Searchbar(){

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

        <div className="searchbar">
            <div>
                <div className="searchInputs">
                    <input type="text" placeholder="Search a college or Athlete..." onChange={(e) => setSearch(e.target.value)} />
                    
                        <div>
                        {search.length != 0 && trackList.filter((val) => {
                            return  search.toLowerCase() === '' 
                            ? val 
                            : val.Name.toLowerCase().includes(search);
                        })
                        .map((val) => {
                            return ( 
                            <a className='dataItem' href={val.link} target="_blank">
                                {val.Name}
                            </a>
                            );
                        })
                        
                        
                        }
                        </div>
                </div>

            </div>


        </div>

    )
}