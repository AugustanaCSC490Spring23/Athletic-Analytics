import "../App.js";
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import Searchbar from "../components/Searchbar.js"

export default function Home(){
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
            <Searchbar/>

        </div>

        
    )
}