import React, { useState, useEffect} from "react";
//import DropdownItems from "../components/DropdownItems";
import Axios from 'axios';
import DisplayHidden from "../components/DisplayHidden";
export default function Squadranking(){

    const[click, setClick] = useState (false);
    const Hoverable= () => setClick(!click);

    const D3confNames =['American_Rivers', 'American_Southwest', 'Atlantic_East', 'CCIW', 'CCS', 'Centennial_Conference', 'Coast-to-Coast', 'Commonwealth_Coast', 'CSAC', 
    'CUNYAC','Empire_8', 'Great_Northeast', 'HCAC', 'Landmark_Conference', 'Liberty_League', 'Little_East', 'MASCAC', 'MIAC', 'Michigan_Intercollegiate', 
    'Middle_Atlantic', 'Midwest_Conference', 'NACC', 'NESCAC', 'NEWMAC', 'NJAC', 'North_Atlantic_Conference', 'North_Coast_AC', 'Northwest_Conference', 
    'OAC', 'ODAC', 'Presidents_AC', 'SAA', 'SCAC', 'SCIAC', 'SLIAC', 'SUNYAC', 'UAA', 'UMAC', 'USA_South', 'WIAC'];

    const D2confNames = ['CACC', 'CCAA', 'CIAA', 'Conference_Carolinas', 'ECC', 'G-MAC', 'GLIAC', 'GLVC', 'GNAC', 'Great_American', 'Gulf_South', 'Lone_Star', 
    'MIAA', 'Mountain_East', 'Northeast-10', 'Northern_Sun', 'PacWest', 'Peach_Belt', 'PSAC', 'RMAC', 'SIAC', 'South_Atlantic'];

    const D1confNames = ['ACC', 'ASUN', 'America_East', 'Atlantic_10', 'Big_East', 'Big_12', 'Big_Sky'];

    const menEvents = ["100 Meters", "200 Meters", "400 Meters", "800 Meters", "1500 Meters", "5000 Meters"
        , "10,000 Meters", "3000 Steeplechase", "110 Hurdles", "400 Hurdles", "Shot put", "Discus", 
        "Javelin", "Hammer", "High Jump", "Long Jump", "Triple Jump", "Pole Vault", "Decathlon"];
    const womenEvents = ["100 Meters", "200 Meters", "400 Meters", "800 Meters", "1500 Meters", "5000 Meters"
    , "10,000 Meters", "3000 Steeplechase", "100 Hurdles", "400 Hurdles", "Shot put", "Discus", 
    "Javelin", "Hammer", "High Jump", "Long Jump", "Triple Jump", "Pole Vault", "Heptathlon"];

    
    const [squadList, setSquadList] = useState([]);
    const [collegeList, setCollegeList] = useState([]);
    const [divList, setDivList] = useState([]);
    const [divSelect, setDivSelect] = useState('');
    const [sexSelect, setSexSelect] = useState(''); 
    const [confSelect, setConfSelect] = useState('');
    const [eventSelect, setEventSelect] = useState('');
    const [sumList, setSumList] = useState([]);

    let confType = null;
    let confOptions = null;
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
    function setConference(e) {
        const val = e.target.value;
        if (val === "Conference") {
            setConfSelect('');
        } else {
            setConfSelect(val);
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

    if(divSelect === "di") {
        confType = D1confNames; //Division 1 conferences
    } else if(divSelect === "dii") {
        confType = D2confNames; //Division 2 conferences
    } else if(divSelect === "diii") {
        confType = D3confNames;
    }

    if(confType) {
        confOptions = confType.map((e) => <option key={e}>{e}</option>);
    }

    function SetParameters(e) {
        const val = e.target.value;
        console.log(val);
        if(val === "changes") {
            const dSelect = divSelect;
            const cSelect= confSelect;
            const sSelect = sexSelect;
            const eSelect = eventSelect;
         //   console.log(dSelect);
          //  console.log(cSelect);
          //  console.log(sSelect);
           // console.log(eSelect);
            SendCollegeRequest(dSelect, cSelect, sSelect, eSelect);
            while (squadList === []) {
                SendSquadRequest(dSelect, sSelect, eSelect);
            }
        }
    }
    function SetResults(e) {
        const val = e.target.value;
        console.log(val);
        if(val === "Results") {
            AddMarks();
        }
    } 
   // var collegeList = {};
    const SendCollegeRequest = async (division, conference, sex, event) => {
        console.log('College Request');
        try {
            if (conference !== '') {
                if (sex !== '' && event !== '') {
                    const response = await Axios.get('http://localhost:3001/SquadRankings/Colleges', {
                        params: {
                            query: `SELECT College from ${division} 
                                WHERE Gender = '${sex}' AND Event = '${event}' AND Conference = '${conference}'
                                Group by College, Event_ID HAVING Count(College) >= 4 order by College;`
                        }
                    })
                    console.log(response.data);
                    setCollegeList(response.data);
                } else if (sex !== '' && event === '') {
                    const response = await Axios.get('http://localhost:3001/SquadRankings/Colleges', {
                        params: {
                            query: `SELECT * FROM ${division} WHERE Conference = '${conference}' AND Gender = '${sex}' LIMIT 10`
                        }
                    })
                    setDivList(response.data);
                } else {
                    const response = await Axios.get('http://localhost:3001/IndivRankings', {
                        params: {
                            query: `SELECT * FROM ${division} WHERE Conference = '${conference}' LIMIT 10`
                        }
                    })
                    setDivList(response.data);
                }
            } else if (conference === '') {
                if (sex !== '' && event !== '') {
                    const response = await Axios.get('http://localhost:3001/SquadRankings/Colleges', {
                            params: {
                                query: `SELECT College from ${division} 
                                WHERE Gender = '${sex}' AND Event = '${event}'
                                Group by College, Event_ID HAVING Count(College) >= 4 order by College;`
                            }
                    })
                    console.log(response.data);
                    setCollegeList(response.data);
                } else if (sex !== '' && event === '') {
                    const response = await Axios.get('http://localhost:3001/IndivRankings', {
                        params: {
                            query: `SELECT * FROM ${division} WHERE Gender = '${sex}' LIMIT 10`
                        }
                    })
                    setDivList(response.data);
                } else {
                    const response = await Axios.get('http://localhost:3001/IndivRankings', {
                        params: {
                            query: `SELECT * FROM ${division} LIMIT 10`
                        }
                    })
                    setDivList(response.data);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
    const SendSquadRequest = async (division, sex, event) => {
        console.log('Squad Request');
        console.log(collegeList);
        try {
            let i = 0;
            let squadLists = [];
            while (i < collegeList.length) {
                const college = Object.values(collegeList[i])
                const collegeName = college[0];
                const collegeResponse = await Axios.get('http://localhost:3001/SquadRankings/TopResults', {
                    params: {
                        query: `SELECT * from ${division} 
                        Where College = '${collegeName}' AND Gender = '${sex}' and Event = '${event}' limit 4;`
                    }
                })
                console.log(collegeResponse.data);
                squadLists.push(collegeResponse.data);
                i++;
            }
            console.log(squadLists);
            setSquadList(squadLists);
        } catch (err) {
            console.log(err);
        }
    }
    function AddMarks() {
        console.log("add marks entered");
  /*      const dSelect= divSelect;
        const sSelect = sexSelect;
        const eSelect = eventSelect;
        sendSquadRequest(dSelect, sSelect, eSelect); */
        const list = squadList.map((list) =>
        list.map((val) => val.Time));
        let sums = [];
        var sum = 0;
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < list[i].length; j++) {
                const mark = list[i][j];
                sum = sum + parseFloat(mark);
                
            }
            sums.push(sum.toFixed(2));
            sum = 0;
        }
        console.log(sums);
        setSumList(sums);
    }
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

            <div className='filterButton'>
                <select onChange={setConference}>
                    <option>Conference </option>
                    {confOptions}
                </select>
            </div>

            <button onClick={SetParameters}>
                <option value = 'changes'>Save Changes</option>
            </button>

            <button onClick={SetResults}>
                <option value='Results'>Results</option>
            </button> 

            <div className='squadCard'>
                <div className="squadCard-header">
                    <h3> Rank </h3>
                    {squadList.map((val) => {
                        return (
                            <a key= {val.id} className='dataItem' href={val.link} target="_blank">
                                {val.Ranking}
                            </a>
                        );
                    }
                    )}  
                    <h3> College </h3>
                    {squadList.map((val) => {
                    return (
                        <a key= {val.id} className='dataItem' href={val.link} target="_blank">
                            {val.College}
                        </a>
                    );
                    }
                        )}
                    <h3> Conference </h3>
                    {squadList.map((val) => {
                    return (
                        <a key= {val.id} className='dataItem' href={val.link} target="_blank">
                            {val.Conference}
                        </a>
                    );
                    }
                        )}
                    <h3> Score </h3> 
                        {sumList.map((val) => {
                            return (
                                <ul key = {val.id}>
                                    {val}
                                </ul>
                            )
                        })}
                </div>

                <div className="squadInfo">
                    <div className="squadChildren">
                        
                        <DisplayHidden>

                            <div className="rankDiv">
                                <h3> Rank </h3>
                                
                            </div>

                            <div className="teamDiv">
                                <h3> Team </h3>
                                
                            </div>
                            <div className="confDiv">
                                <h3> Conference </h3>

                                                            
                            </div>
                            <div className="scoreDiv">
                                <h3> Score </h3>
                                                            
                            </div>



                        </DisplayHidden>

                    </div>
                </div>
            </div>   
        </div>
    </div>

 
    )
}