import image from "../icons/Block-start.png";
import "./Features.css";



window.addEventListener('load', function() {
    
    var fade1 = document.getElementById('fade1');
    fade1.style.opacity = '1'
    var fade2 = document.getElementById('fade2');
    fade2.style.opacity = '1'
    var featureCard1 = document.getElementById('featureCard1');
    featureCard1.style.transform = 'translateX(0%)'
    var featureCard2 = document.getElementById('featureCard2');
    featureCard2.style.transform = 'translateX(0%)'
    var featureCard3 = document.getElementById('featureCard3');
    featureCard3.style.transform = 'translateX(0%)'
    var featureCard4 = document.getElementById('featureCard4');
    featureCard4.style.transform = 'translateX(0%)'
    var featureCard5 = document.getElementById('featureCard5');
    featureCard5.style.transform = 'translateX(0%)'
  
  });

export default function features(){
    return <div  className="featuresContainer">
        <div  className="featureHeader" >
            <h1 id="fade1">Made for both Coaches and Athletes</h1>
            <img src={image} alt="block-start" id="fade2"/>
        </div>
        
        <div className="featureItems"> 

            <div  className="featureCard" id="featureCard1">
                <h3>Squad Rankings </h3>
                <p>
                Check out a school's average ranking and marks based on their top 4 athletes for any event!
                </p>
            </div>

            <div class="featureCard" id="featureCard2">
                <h3>Individual Rankings</h3>
                <p> View the top 50 athletes and their marks for any event!</p>
            </div>

            <div class="featureCard" id="featureCard3">
                <h3>Live Mark Updates</h3>
                <p> All data is updated daily to provide accurate rankings and comparisons.</p>
            </div>

            <div class="featureCard" id="featureCard4">
                <h3>School Profiles</h3>
                <p> Search a school and see their top 5 athletes for any event.</p>
            </div>

        </div>

    </div>
}