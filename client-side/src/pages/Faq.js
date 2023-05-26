import "../App.js";
import "./Faq.css";

export default function FAQ(){

    window.addEventListener('load', function() {
        
        var q1  = document.getElementById('q1');
        var q2  = document.getElementById('q2');
        var q3  = document.getElementById('q3');
        var q4  = document.getElementById('q4');

        // fade-in for home logo
        q1.style.opacity = '1';
        q2.style.opacity = '1';
        q3.style.opacity = '1';
        q4.style.opacity = '1';
      });
      
    return (
    
    <div className="FAQcontainer">
        <div className="faq-info">
            <h1>Frequently Asked Questions</h1>
            <div id="q1" className='question'>
                <h2>Q: Where do we get our data?</h2>
                <p>A: We get our data from TFRRS.com. 
                    We claim no ownership rights to the data on this website. 
                    We simply take the data and make it digestible for the average Joe.
                </p>
            </div>

            <div id="q2" className='question'>
                <h2>Q: What are Squad Rankings?</h2>
                <p>A: Squad Rankings calculates the average mark per event based on their top four copmpeting athletes </p>
            </div>

            <div id="q3" className='question'>
                <h2>Q: What are Individual Rankings?</h2>
                <p>A: Individual Rankings shows the stats of the top 50 athletes for each event such as what school they attend, what year in college they are, what their ranking per event is.</p>
            </div>

            <div id="q4" className='question'>
                <h2>Q: What are School Profiles?</h2>
                <p>A: School Profiles give a more in-depth view of a school's roster by displaying the top 5 athletes for each event</p>
            </div>

            <div id="q4" className='question'>
            </div>

            <div id="q4" className='question'>
            </div>
        </div>
    </div>

    )

}