import image from "../icons/Block-start.png";
export default function features(){
    return <div className="featuresContainer">
        <div className="featureHeader">
            <h1>Made for both Coaches and Athletes</h1>
            <img src={image} alt="block-start"/>

        </div>
        
        <div className="featureItems"> 


            <div className="featureCard">
                
                
                <h3>Squad Rankings </h3>
                <p>
                    Check out a school's  average ranking and marks for any event.
                </p>
            
            </div>

            <div class="featureCard">
                <h3>Individual Rankings</h3>
                <p> See individual athlete progression, achievements and how they compare to the rest of their conference.</p>
            </div>

            <div class="featureCard">
                    <h3>Interdivisional Mark Comparision</h3>
                    <p>Compare marks between athletes between divisions.</p>

            </div>
            <div class="featureCard">
                    <h3>Meet Predictor</h3>
                    <p>Choose any school and see how they compare against one another based on previous times.</p>
            </div>

            <div class="featureCard">
                <h3>Live Mark Updates</h3>
                <p> All our data update daily to provide accurate comparisons and rankings.</p>
            </div>




        </div>

    
    
    
    
    
    
    </div>
}