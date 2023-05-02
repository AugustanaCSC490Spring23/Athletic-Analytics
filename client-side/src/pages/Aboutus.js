import vallejo from "../authorPhotos/Vallejo.png"
import cathcart from "../authorPhotos/Cathcart.png"

export default function aboutus(){
    return (
    <div className="aboutContainer">
        <h1> Meet the creators:   </h1>

        <div className="bioCard">
            <h3> Bryan Holt </h3>
        </div>

        <div className="bioCard">
            <div className="photo-and-name">
                <img src={vallejo} alt="gabe"/>
                <h3> Gabriel Vallejo</h3>

            </div>
            <p> Currently a senior at Augustana College majoring in computer science and neuroscience. Responsible 
                for the front-end development of this project</p>
        </div>

        <div className="bioCard">        
            <div className="photo-and-name">
                <img src={cathcart} alt="jon"/>
                <h3> Jon Cathcart</h3>

            </div>
            <p> Currently a senior at Augustana College majoring in computer science. Responsible 
                for back-end react and data manipulation with the external sourced database</p>
        </div>

        <div className="bioCard">       
            <h3> Jacob Speirer </h3>
        </div>

    </div>    

        
        
        
        
        
        
        )
}