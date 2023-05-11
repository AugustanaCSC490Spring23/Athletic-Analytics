import "../App.js";
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import Searchbar from "../components/Searchbar.js"
import HomeLogo from "../icons/HomePageLogo.png"


export default function Home(){
    return(

        <div className="homeContainer" >
            <div><img className="homeLogo" src={HomeLogo} alt="AALogo"/></div>

            {/* This is the search bar component */}
            <Searchbar/>

            {/* This is where you'll put cards
             that display on the homepage when the database updates the web scrape*/}


        </div>

        
    )
}