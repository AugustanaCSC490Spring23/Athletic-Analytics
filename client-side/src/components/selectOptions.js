import Axios from 'axios';
import React, { useState, useEffect} from "react";


export default function NavButton(){
    const[click, setClick] = useState (false);
    const Hoverable= () => setClick(!click);

    // const onMouseEnter = () = => {
    //     if(WritableStreamDefaultController.innerWidth < 960) {
    //         setDropdown(false);
    //     } else {
            
    //     }
    // }
    function setDivision(e) {
        const val = e.target.value;
       // console.log("SetDivision 1 " + selectDiv);
       // setSelectDiv(val);
        sendGetRequest(val);
       // console.log("SetDivision 2 " + selectDiv);
    }
    const [trackList, setTrackList] = useState([]);
    const sendGetRequest = async (division) => {
        try {
            const axiosLink = "http://localhost:3001/" + division;
            console.log("Send get request " + axiosLink);
            const response = await Axios.get(axiosLink); 
            console.log(typeof(response.data));
            console.log("data recieved");
            console.log(response.data);
            setTrackList(response.data);  
        } catch (err) {
            console.error(err);
        } 
    }
    //useEffect(()=> {
        /* Axios.get(axiosLink).then((response) => {
            setTrackList(response.data);
            console.log(trackList);
        })
        .catch(err => {
            console.error(err);
        }); */
    //    sendGetRequest()
    //}, []);

    return(
        <div className="squadContainer">
            <div className='filterButton'>
                {/*e=>setSelectDiv(e.target.value)*/}
                <select onChange={setDivision}>
                    <option value ='DivisionI'      >Men's</option>
                    <option value ='DivisionII'>Women's</option>
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
                <select >
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

    )
}