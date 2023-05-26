import "../App.js";
import "./Home.css";
import { Link } from 'react-router-dom';
import HomeLogo from "../icons/HomePageLogo.png"
import squadIcon from "../icons/squadIcon.png"
import indIcon from "../icons/indIcon.png"
import schoolIcon from "../icons/schoolIcon.png"

window.addEventListener('load', function() {
  var homeLogo = document.getElementById('homeLogo');
  
  // fade-in for home logo
  homeLogo.style.opacity = '1';
  
  // transition for the heroCards :) 
  var heroCard1 = document.getElementById('heroCard1');
  heroCard1.style.transform = 'translateX(0%)'
  var heroCard2 = document.getElementById('heroCard2');
  heroCard2.style.transform = 'translateX(0%)'
  var heroCard3 = document.getElementById('heroCard3');
  heroCard3.style.transform = 'translateX(0%)'
});

export default function Home(){
    return(
        <div className="homeContainer" >
            <div className="homeCard">
                <img className='homeLogo' src={HomeLogo} alt="AALogo" id='homeLogo'/>
            </div>
            <div className="home-display">      
                <div className="heroCard" id="heroCard1">
                        <Link to="/Squadranking" className="active">             
                            <div><img className="squadIcon" src={squadIcon} alt="squad-hero-icon"/></div>
                            <p>Squad Rank</p>
                        </Link>                      
                </div>   
                <div className="heroCard" id="heroCard2">
                    <Link to="/Indranking" className="active">             
                        <div><img className="indIcon" src={indIcon} alt="ind-hero-icon"/></div>
                        <p>Individual Rankings</p>
                    </Link>
                </div>
                <div className="heroCard" id="heroCard3">
                    <Link to="/Schoolprofiles" className="active">             
                        <div><img className="schoolIcon" src={schoolIcon} alt="school-hero-icon"/></div>
                        <p>School Profiles</p>
                    </Link>
                </div>
            </div>
        </div> 
    )
}