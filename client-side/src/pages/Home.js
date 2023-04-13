import "../App.js";
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import Searchbar from "../components/Searchbar.js"

export default function Home(){
    return(

        <div className="container" >
            {/* This is the search bar component */}
            <Searchbar/>
            <div className='homeCard-menu'>

            {/* This is cards that display on the homepage */}
                <div className="homeCard">
                    <Link to="/Squadranking" >  
                        <div><img className="homeIcon" src={require("../icons/plus-or-minus.png" )}alt="Squad Rank"/> <p>Squad Rankings</p></div>
                    </Link>

                </div>
                <div className="homeCard">
                    <Link to="/Indranking" > 
                        <div><img className="homeIcon" src={require("../icons/trophy.png")}alt="Individual Rankings"/><p>Individual Rankings</p> </div>
                    </Link>
                </div>

                <div className="homeCard">
                    <Link to="/Meetpredictor">  
                        <div><img className="homeIcon" src={require("../icons/bar-chart.png" )}  alt="Meet Predictor"/> <p>Meet Predictor</p></div>
                    </Link>
                </div>
    


            {/* This is the search bar component */}
            <div className="searchBox">
              <label>Search</label>
                <input type="text" onChange={(e) => setSearch(e.target.value)} />
                  <ul placeholder="Search a college...">
                    {trackList.filter((val) => {
                      return search.toLowerCase() === '' 
                      ? val 
                      : val.Name.toLowerCase().includes(search);
                    })
                    .map((val) => {
                      return ( 
                        <h1>
                          {val.Name}
                        </h1>
                      );
                  })}
                </ul>
            </div>


        </div>

        
    )
}