import "../App.js";
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import Searchbar from "../components/Searchbar.js"
import HomeLogo from "../icons/HomePageLogo.png"
import squadIcon from "../icons/squadIcon.png"
import indIcon from "../icons/indIcon.png"
import schoolIcon from "../icons/schoolIcon.png"
import fadeEffectScript from "../components/fadeEffectScript.js";


window.addEventListener('load', function() {
  var homeLogo = document.getElementById('homeLogo');
  homeLogo.style.opacity = '1'; // Make the image visible
  // transition for the heroCards :) 
//   var heroCard1 = document.getElementById('heroCard1');
//   heroCard1.style.transform = ' '
//   var heroCard2 = document.getElementById('heroCard2');
//   heroCard1.style.transform = ' '
//   var heroCard3 = document.getElementById('heroCard3');
//   heroCard1.style.transform = ' '


});

export default function Home(){
    return(

        <div className="homeContainer" >
            <div className="homeCard">
                <img className="homeLogo" src={HomeLogo} alt="AALogo" id="homeLogo"/>
                <h2> College Stats made easy!</h2>
            </div>

            {/* This is the search bar component */}

            {/* This is where you'll put cards */}
            <div className="home-display">

                <div className="heroCard" id="heroCard1">
                    <div><img className="squadIcon" src={squadIcon} alt="squad-hero-icon"/></div>
                    <p>Squad Rank</p>

                </div>   

                <div className="heroCard" id="heroCard2">
                    <div><img className="indIcon" src={indIcon} alt="ind-hero-icon"/></div>
                    <p>Individual Rankings</p>
                    </div>
                <div className="heroCard" id="heroCard3">
                    <div><img className="schoolIcon" src={schoolIcon} alt="school-hero-icon"/></div>
                    <p>School Profiles</p>
                    </div>


            </div>

        </div>

        
    )
}