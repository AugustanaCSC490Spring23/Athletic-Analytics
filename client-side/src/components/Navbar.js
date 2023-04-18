import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import navButton from "./NavButton.js";
import DisplayChildrenButton from './DisplayChildrenBtn.js';

    
  export default function Navbar(){
    
    return (
        
        <div className="navbar">
            <div className="navbarItems">
            <div className="navMenu">
                
                {/* Below is the HamburgerMenu on Nav Bar */}
                <div className="hamburgerMenu " > 
                    <div className="hamburgerMenuBtn" >
                        <DisplayChildrenButton>
                                <ul>

                                <div className="hamburgerListItem">
                                    <Link to="/"><div>Home</div></Link>
                                </div>
                                <div className="hamburgerListItem">  
                                    <Link to="/Squadranking" > <div>Squad Rank</div></Link>
                                </div>
                                <div className="hamburgerListItem"> 
                                    <Link to="/Indranking" > <div>Individual Rankings</div></Link>
                                </div>
                                <div className="hamburgerListItem"> 
                                    <Link to="/" > <div>Records</div></Link>
                                </div>
                                <div className="hamburgerListItem"> 
                                    <Link to="/" > <div>Recruiting</div></Link>
                                </div>
                        
                            </ul>
                        </DisplayChildrenButton>
                    </div>
        
                </div>
            </div>

            {/* Below is the Nav Bar Buttons */}
            <div className='navButton'>
                <CustomLink to="/features" className="active">Features</CustomLink>
            </div>

            <div className='navButton'>
                <CustomLink to="/faq" className="active">FAQ</CustomLink>
            </div>

            <div className='navButton'>
                <CustomLink to="/about" className="active">About</CustomLink>
            </div>


            </div>
        </div>

    )
}

function CustomLink({to, children, ...props }){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return(
        <li className={isActive === to ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>

    )

}

















