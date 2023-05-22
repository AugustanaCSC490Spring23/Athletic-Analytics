import "../App.js";
import "./Home.css";
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import Searchbar from "../components/Searchbar.js"
import HomeLogo from "../icons/HomePageLogo.png"
import squadIcon from "../icons/squadIcon.png"
import indIcon from "../icons/indIcon.png"
import schoolIcon from "../icons/schoolIcon.png"
import fadeEffectScript from "../components/fadeEffectScript.js";


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


function CustomLink({to, children, ...props }){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return(
        <a className={isActive === to ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </a>

    )

}



export default function Home(){
    return(

        <div className="homeContainer" >
            <div className="homeCard">
                <img className="homeLogo" src={HomeLogo} alt="AALogo" id="homeLogo"/>
            </div>

            <div className="home-display">



                

                <div className="heroCard" id="heroCard1" onclick="location.href='localhost:3000/Squadranking';">
                    
                        <CustomLink to="/Squadranking" className="active">             
                            <div><img className="squadIcon" src={squadIcon} alt="squad-hero-icon"/></div>
                            <p>Squad Rank</p>
                        </CustomLink>
                            
                    
                </div>   



                <div className="heroCard" id="heroCard2">
                    <CustomLink to="/Indranking" className="active">             
                        <div><img className="indIcon" src={indIcon} alt="ind-hero-icon"/></div>
                        <p>Individual Rankings</p>
                    </CustomLink>
                </div>

                <div className="heroCard" id="heroCard3">
                    <CustomLink to="/Schoolprofiles" className="active">             
                        <div><img className="schoolIcon" src={schoolIcon} alt="school-hero-icon"/></div>
                        <p>School Profiles</p>
                    </CustomLink>

                </div>


            </div>

        </div>

        
    )
}