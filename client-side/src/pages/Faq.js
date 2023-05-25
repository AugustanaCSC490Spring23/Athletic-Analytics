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
                <p> We get our data from TFRRS.com. 
                    We claim no ownership rights to the data on this website. 
                    We simply take the data and make it digestible for the average Joe.
                </p>
            </div>

            <div id="q2" className='question'>
                <h2>Q: What are Squad Rankings?</h2>
                <p>A: Squad Rankings calculates their average time a school records </p>
            </div>

            <div id="q3" className='question'>
                <h2>Q: What are Individual Rankings?</h2>
                <p>A: Individual Rankings shows individual player stats such as what school they attend, what their event rankning, and all of their recorded times.</p>
            </div>

            <div id="q4" className='question'>
                <h2>Q: How do we calculate our meet predicitons? </h2>
                <p>A: Ask Bryan Holt. He knows. (:</p>
            </div>

        </div>


    </div>

    )

}