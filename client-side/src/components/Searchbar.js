import React, { useState, useEffect } from "react";
import "./Searchbar.css";
import Axios from 'axios';
import DisplayHidden from "./DisplayHidden";

//import SearchIcon from '@mui/icons-material/Search';

const Searchbar = ({ onSearch }) => {

    const [trackList, setTrackList] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    useEffect(() => {
      Axios.get("http://localhost:3001/Searchbar").then((response) => {
        setTrackList(response.data);
        console.log(response.data);
      });
    }, []);
      
    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };
      
    const handleResult = (val) => {
        console.log('Clicked ' + val.College);
    }
      return(

        <div className="searchbar">
            
                <div className="searchInputs">
                    <input type="text" placeholder="Search a College..." onChange={handleInputChange} />
                       {/* we need a max number of result items */}
                        {search.length !== 0 && trackList.filter((val) => {
                            return search === '' 
                            ? val 
                            : val.College.toLowerCase().includes(search.toLowerCase());
                            }).map((val, index) => {
                                return ( 
                                    <a key={index} href={val.link} target="_blank" onClick={() => handleResult(val)}>
                                        <p className='dataItem'>
                                            {val.College}
                                        </p>
                                    </a>
                                );
                            })
                        }

                </div>
        </div>
    );
  };
export default Searchbar; 
