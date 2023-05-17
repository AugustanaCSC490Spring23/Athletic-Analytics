import "../App.js";
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import Searchbar from "../components/Searchbar.js"
import HomeLogo from "../icons/HomePageLogo.png"


export default function Home(){
    return(

        <div className="homeContainer" >
            <div><img className="homeLogo" src={HomeLogo} alt="AALogo"/></div>

            {/* This is the search bar component */}

            {/* This is where you'll put cards */}
            <div className="home-display">

                <div className="heroCard">
                    <div className="uh">
                        <div>PlaceHolder</div>
                        </div>
                    <p>Squad Rank</p>
                </div>   

                <div className="heroCard">
                    <div className="uh">
                        <div>PlaceHolder</div>
                    </div>
                    <p>Individual Rankings</p>
                    </div>
                <div className="heroCard">
                    <div className="uh">
                        <div>PlaceHolder</div>
                    </div>
                    <p>School Profiles</p>
                    </div>


            </div>

        </div>

        
    )
}