import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import navButton from "./NavButton.js";



export default function Navbar(){
    return (
        
        
        <div className="navMenu">
            <div className='navButton'>
            <Link to="/" className="site-title">Menu</Link>
            </div>

            <div className='navButton'>
            <Link to="/" className="site-title">Home</Link>
            </div>
            
            <div className='navButton'>
            <CustomLink to="/features" className="active">Features</CustomLink>
            </div>

            <div className='navButton'>
            <CustomLink to="/faq" className="active">FAQ</CustomLink>
            </div>

            <div className='navButton'>
            <CustomLink to="/about" className="active">About</CustomLink>
            </div>

            <div className='navButton'>
            <CustomLink to="/login" className="active">Login</CustomLink>
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

















