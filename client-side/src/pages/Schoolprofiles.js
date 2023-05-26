import "../App.js";
import "./SchoolProfiles.css"
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import Searchbar from "../components/Searchbar.js";
import DataTable from "react-data-table-component"

export default function Schoolprofiles() {
  const menEvents = ["100 Meters", "200 Meters", "400 Meters", "800 Meters", "1500 Meters", "5000 Meters"
    , "10,000 Meters", "3000 Steeplechase", "110 Hurdles", "400 Hurdles", "Shot put", "Discus",
    "Javelin", "Hammer", "High Jump", "Long Jump", "Triple Jump", "Pole Vault", "Decathlon"];
  const womenEvents = ["100 Meters", "200 Meters", "400 Meters", "800 Meters", "1500 Meters", "5000 Meters"
    , "10,000 Meters", "3000 Steeplechase", "100 Hurdles", "400 Hurdles", "Shot put", "Discus",
    "Javelin", "Hammer", "High Jump", "Long Jump", "Triple Jump", "Pole Vault", "Heptathlon"];

  const [college, setCollege] = useState('');
  const [eventSelect, setEventSelect] = useState('');
  const [sexSelect, setSexSelect] = useState('Men');
  const [athletesList, setAthletesList] = useState([]);

  const handleSearch = (value) => {
    console.log('Search value:', value);
    setCollege(value);
  };


  let columns = [
    {
      name: 'Sex',
      selector: row => row.Gender
    },
    {
      name: 'Event',
      selector: row => row.Event
    },
    {
      name: 'Athlete',
      selector: row => row.Athlete
    },
    {
      name: 'Year',
      selector: row => row.Year
    },
    {
      name: 'Meet Date',
      selector: row => row.Meet_Date
    },
  ];

  if (athletesList.length > 0) {
    if (athletesList.Time_S !== 0) {
      columns.splice(3, 0, {
        name: 'Time',
        selector: row => row.Time_I
      });
    }

    if (athletesList.Distance_m !== 0) {
      columns.splice(4, 0, {
        name: 'Distance',
        selector: row => row.Distance_m + 'm'
      });
    }

    if (athletesList.Points !== 0) {
      columns.splice(5, 0, {
        name: 'Points',
        selector: row => row.Points
      });
    }
    if (athletesList.Wind !== '') {
      columns.push({
        name: 'Wind',
        selector: row => row.Wind
      });
    }
  }

  const tableCustomStyles = {
    headRow: {
      style: {
        color: '#223336',
        backgroundColor: '#e7eef0',
        fontSize: '25px'
      },
    },
    rows: {
      style: {
        color: "STRIPEDCOLOR",
        backgroundColor: "STRIPEDCOLOR"
      },
      stripedStyle: {
        color: "NORMALCOLOR",
        backgroundColor: "#d0d0d0"
      }
    }
  }

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
    setSexSelect(val);
  }
  if (sexSelect === "Men") {
    sexType = menEvents;
  } else if (sexSelect === "Women") {
    sexType = womenEvents;
  }

  if (sexType) {
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
    let dataList = [];
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
        dataList = response.data;
      } else if (event === '') {
        if (sex !== '') {
          const response = await Axios.get('http://localhost:3001/SchoolProfile', {
            params: {
              query: `Select * FROM di WHERE College = '${college}' AND Gender = '${sex}'
                            UNION 
                            SELECT * FROM dii WHERE College = '${college}' AND Gender = '${sex}'
                            UNION 
                            SELECT * FROM diii WHERE College = '${college}' AND Gender = '${sex}';`
            }
          })
          dataList = response.data;
        } else {
          const response = await Axios.get('http://localhost:3001/SchoolProfile', {
            params: {
              query: `Select * FROM di WHERE College = '${college}'
                            UNION 
                            SELECT * FROM dii WHERE College = '${college}'
                            UNION 
                            SELECT * FROM diii WHERE College = '${college}';`
            }
          })
          dataList = response.data;
        }
      }
      setAthletesList(dataList);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="schoolprofilesContainer">
      <h1> School Profiles </h1>
      <p> This page allows you to search a school to see their top athletes, as well as the roster for each school's event</p>

      <Searchbar onSearch={handleSearch} />
      <div className="selectOptions">
        <div className='filterButton'>
          {/*e=>setSelectDiv(e.target.value)*/}
          <select onChange={setSex}>
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
      </div>
      <button className="resultsButton" onClick={setResults}>
        <option>Results</option>
      </button>

      <div className='collegeName'>{college}</div>
      <div className="schoolTable">
        <DataTable
          columns={columns}
          data={athletesList}
          striped
          paginationPerPage={50}
          paginationPerPageOptions={50}
          customStyles={tableCustomStyles}
          className="customSchoolTable"
        />


      </div>
    </div>
  )
}