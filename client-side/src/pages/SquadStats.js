import React, { useState, useEffect} from "react";
import "./SquadStats.css";
import Axios from 'axios';
import DisplayHidden from "../components/DisplayHidden";
import DataTable from "react-data-table-component";



export default function Squadranking(){




    /*
        *GET RID OF IC4A_ECAC & METS CONFERENCES IN TABLES*
    */
    const[click, setClick] = useState (false);
    const Hoverable= () => setClick(!click);

    const menEvents = ["100 Meters", "200 Meters", "400 Meters", "800 Meters", "1500 Meters", "5000 Meters"
        , "10,000 Meters", "3000 Steeplechase", "110 Hurdles", "400 Hurdles", "Shot put", "Discus", 
        "Javelin", "Hammer", "High Jump", "Long Jump", "Triple Jump", "Pole Vault", "Decathlon"];
    const womenEvents = ["100 Meters", "200 Meters", "400 Meters", "800 Meters", "1500 Meters", "5000 Meters"
    , "10,000 Meters", "3000 Steeplechase", "100 Hurdles", "400 Hurdles", "Shot put", "Discus", 
    "Javelin", "Hammer", "High Jump", "Long Jump", "Triple Jump", "Pole Vault", "Heptathlon"];

    
    const [squadList, setSquadList] = useState([]);
    //const [athletesList, setAthletesList] = useState([]);
    const [divSelect, setDivSelect] = useState('');
    const [sexSelect, setSexSelect] = useState(''); 
    const [eventSelect, setEventSelect] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    //const [collegeSelect, setCollegeSelect] = useState(null);

    useEffect(() => {

      }, []);

      
    const handlePageChange = (pageNumber) => {
        console.log('inside page change ' + pageNumber)
        setCurrentPage(pageNumber);
      };
    let columns = [
        {
          name: 'Rank',
          selector: (row, index) => index + 1 + ((currentPage - 1) * itemsPerPage),
          sortable: false
        },
        {
          name: 'College',
          selector: row => row.College
        },
        {
          name: 'Conference',
          selector: row => row.Conference
        }
      ];
      if (squadList.length > 0) {
        if (squadList[0].sum_time !== 0) {
          columns.push({
            name: 'Total',
            selector: row => convertTime(row.sum_time)
          });
          columns.push({
            name: 'Average',
            selector: row => convertTime(row.avg_time)
          });
        }
    
        if (squadList[0].sum_dist !== 0) {
            columns.push({
              name: 'Total',
              selector: row => row.sum_dist.toFixed(2) + 'm'
            });
            columns.push({
                name: 'Average',
                selector: row => row.avg_dist.toFixed(2) + 'm'
              });
          }
    
          if (squadList[0].sum_points !== 0) {
            columns.push({
              name: 'Total',
              selector: row => row.sum_points.toFixed(2)
            });
            columns.push({
                name: 'Average',
                selector: row => row.avg_points.toFixed(2)
              }); 
          }
      }
      const tableCustomStyles = {
        headRow: {
          style: {
            color:'#223336',
            backgroundColor: '#e7eef0'
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

    function setDivision(e) {
        const val = e.target.value;
        if (val === "Division") {
            setDivSelect('');
        } else {
            setDivSelect(val);
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
   
    function SetResults() {
        SendCollegeRequest(divSelect, sexSelect, eventSelect);
        //setCurrentPage(1);
        }
    const SendCollegeRequest = async (division, sex, event) => {
        try {
            if(division !== '') {
                if (sex !== '' && event !== '') {
                    const response = await Axios.get('http://localhost:3001/SquadRankings/Colleges', {
                        params: {
                            query: `SELECT College, Conference, SUM(Time_S) AS sum_time, AVG(Time_S) 
                            AS avg_time, SUM(Distance_m) AS sum_dist, AVG(Distance_m) AS avg_dist, 
                            SUM(Points) AS sum_points, AVG(Points) AS avg_points, Event_ID FROM 
                                (SELECT College, Conference, Time_S, Distance_m, Points, Event_ID, ROW_NUMBER() 
                                    OVER (PARTITION BY College, Conference) 
                                    AS row_num FROM ${division} WHERE Gender = '${sex}' AND Event = '${event}'
                                ) ${division} WHERE row_num <= 4 GROUP BY College, Conference, Event_ID 
                            ORDER BY avg_time, avg_dist DESC, avg_Points DESC;`
                        }
                    })
                    const filteredSquadList = response.data.filter((val) => 
                        (val.sum_time >= val.avg_time * 4 && val.sum_dist === 0 && val.sum_points === 0) ||
                        (val.sum_dist >= val.avg_dist * 4 && val.sum_time === 0 && val.sum_points === 0) ||
                        (val.sum_points >= val.avg_points * 4 && val.sum_time === 0 && val.sum_dist === 0)
                    );
                    setSquadList(filteredSquadList);
                } 
            } else if (division === '') {
                const response = await Axios.get('http://localhost:3001/SquadRankings/Colleges', {
                    params: {
                        query: `SELECT College, Conference, SUM(Time_S) AS sum_time, AVG(Time_S) 
                        AS avg_time, SUM(Distance_m) AS sum_dist, AVG(Distance_m) AS avg_dist, 
                        SUM(Points) AS sum_points, AVG(Points) AS avg_points, Event_ID FROM (
                            SELECT College, Conference, Time_S, Distance_m, Points, Event_ID, ROW_NUMBER() OVER (PARTITION BY College, Conference) 
                            AS row_num FROM di WHERE Gender = '${sex}' AND Event = '${event}'
                            UNION ALL
                            SELECT College, Conference, Time_S, Distance_m, Points, Event_ID, ROW_NUMBER() OVER (PARTITION BY College, Conference)
                            AS row_num FROM dii WHERE Gender = '${sex}' AND Event = '${event}'
                            UNION ALL
                            SELECT College, Conference, Time_S, Distance_m, Points, Event_ID, ROW_NUMBER() OVER (PARTITION BY College, Conference)
                            AS row_num FROM diii WHERE Gender = '${sex}' AND Event = '${event}'
                        ) combined WHERE row_num <= 4 GROUP BY College, Conference, Event_ID ORDER BY avg_time, avg_dist DESC, avg_Points DESC;`
                    }
                })
                const filteredSquadList = response.data.filter((val) => 
                        (val.sum_time >= val.avg_time * 4 && val.sum_dist === 0 && val.sum_points === 0) ||
                        (val.sum_dist >= val.avg_dist * 4 && val.sum_time === 0 && val.sum_points === 0) ||
                        (val.sum_points >= val.avg_points * 4 && val.sum_time === 0 && val.sum_dist === 0)
                    );
                setSquadList(filteredSquadList);
            }
        } catch (err) {
            console.log(err);
        }
    }

    function convertTime(seconds) {
        const totalMilliseconds = seconds * 1000;
        const minutes = Math.floor(totalMilliseconds / (1000 * 60));
        const secondsRemaining = Math.floor((totalMilliseconds % (1000 * 60)) / 1000);
        const millisecondsRemaining = Math.floor(totalMilliseconds % 1000);
        const millisecondsRound = Math.round(millisecondsRemaining / 10, 1)
        if (minutes === 0) {
            return `${secondsRemaining}.${millisecondsRound}`;
        } else {
            return `${minutes}:${secondsRemaining}.${millisecondsRound}`;
        }
    }

 /*   function handleCollegeClick(college) {
        setCollegeSelect(college);
        sendAthletesRequest(divSelect, sexSelect, eventSelect, college)
    }
              
    const sendAthletesRequest = async (division, sex, event, college) => {
        try {
            if (division !== '') {
                const response = await Axios.get('http://localhost:3001/SquadRankings/Colleges', {
                        params: {
                            query: `Select * FROM ${division} WHERE College = '${college}' AND Gender = '${sex}' AND Event = '${event}' limit 4`
                        }
                    })
                    console.log(response.data);
                    setAthletesList(response.data);
            } else if (division === '') {
                const response = await Axios.get('http://localhost:3001/SquadRankings/Colleges', {
                        params: {
                            query: `Select * FROM di WHERE College = '${college}' AND Gender = '${sex}' AND Event = '${event}'
                            UNION
                            Select * FROM dii WHERE College = '${college}' AND Gender = '${sex}' AND Event = '${event}'
                            UNION
                            Select * FROM diii WHERE College = '${college}' AND Gender = '${sex}' AND Event = '${event}' limit 4`
                        }
                    })
                    console.log(response.data);
                    setAthletesList(response.data);
            }
            
        } catch (err) {
            console.log(err);
        }
    } */
    return (
    <div className="homeContainer">
        <div className='squadHeader'>
            <h2> Squad Statistics </h2>
            <p>This page will allow you to view stats by school to view their best events, highest scorers, etc.
                Select a division and event to display squad rankings.
            </p>
        </div>

        <div className="squadContainer">
            <div className='filterButton'>
                <select onChange={setSex}>
                    <option>Sex</option>
                    <option>Men</option>
                    <option>Women</option>
                </select>
            </div>

            <div className='filterButton'>
                <select onChange={setEvent}>
                  <option>Event</option>
                  {eventOptions}
                </select>
            </div>

            <div className='filterButton'>
                <select onChange={setDivision}>
                    <option> Division </option>
                    <option value ='di'>Division I</option>
                    <option value ='dii'>Division II</option>
                    <option value ='diii'>Division III</option>
                </select>
            </div>

            <button className="resultsButton" onClick={SetResults}>
                <option>Results</option>
            </button>


            <div className='squadCard'>
                <div className="squadCard-header">
                    <DataTable
                    columns={columns}
                    data={squadList}
                    striped
                    pagination
                    paginationPerPage={itemsPerPage}
                    responsive
                    customStyles={tableCustomStyles}
                    paginationTotalRows={squadList.length}
                    paginationPerPageOptions={[10, 20, 30, 40, 50]}
                    onChangePage={handlePageChange}
                    paginationComponentOptions={{
                        noRowsPerPage: true
                    }}
                    />
                </div>
                </div>
            </div>
 
    </div>
    )
    


}