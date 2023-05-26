import "./Aboutus.css";
import vallejo from "../authorPhotos/Vallejo.png";
import cathcart from "../authorPhotos/Cathcart.png";
import holton from "../authorPhotos/Brian.png";
import speirer from "../authorPhotos/Speirer.png";

export default function aboutus(){
    return (
    <div className="aboutContainer">
        <h1> Meet the Devs:   </h1>

        <div className="bioCard">
            <div className="photo-and-name">
                <img src={holton} alt="brian"/>
                <h3> Brian Holton </h3>
            </div>
            <p> Senior at Augustana College majoring in computer science and data analytics. 
                Responsible for getting the online data for the website, data cleaning, as well as database management.
            </p>
        </div>

        <div className="bioCard">
            <div className="photo-and-name">
                <img src={vallejo} alt="gabe"/>
                <h3> Gabriel Vallejo</h3>

            </div>

            <p> Currently a senior at Augustana College majoring in computer science and neuroscience. Responsible 
                for the front-end development of this project. </p>
        </div>

        <div className="bioCard">        
            <div className="photo-and-name">
                <img src={cathcart} alt="jon"/>
                <h3> Jon Cathcart</h3>

            </div>

            <p> Currently a senior at Augustana College majoring in computer science. Responsible 
                for back-end react and data manipulation with the external sourced database. Also aided in the creation of a few front-end javascript components. </p>
        </div>

        <div className="bioCard">     
            <div className="photo-and-name">
                <img src={speirer} alt="brian"/>
                <h3> Jacob Speirer </h3>
            </div>
            <p> Currently a senior at Augustana College majoring in computer science. Responsible for Web Scraping, Google Cloud Functions, automation. </p>
        </div>
    </div>     
        
        )
}