import {useContext} from "react";
import PointsContext from "../../../context/pointsContext";
import "./navbar.css";
import {Link} from 'react-router-dom';


const Navbar = (props) => {
    const contextValues = useContext(PointsContext);
    const page = props.page;

    const customColor = (x) => {
        return {color: page=== x ?'Black':'white'}
    }

    return(
        <div className='header-parent-container'>
            <div className='left'>
                <Link to="/" style={customColor('home')}>Home</Link>
                <Link to="/image-generator" style={customColor('imageGenerator')} >Image Generator</Link>
                <Link to="/history"  style={customColor('history')}>History</Link>
                {/* <Link to="/contact" >Contact Us</Link>
                <Link to="/help" >Help</Link> */}
            </div>
            <div className="right" style={{padding: '4px', color: 'brown'}}>
                {contextValues.userPoints}
                <Link to="/signup" style={customColor('signup')}>Signup</Link>
                <Link to="/login" style={customColor('login')}>
                {contextValues.isLoggedIn?
                <button onClick={contextValues.logout}>Logout</button>
                :<button onClick={contextValues.login}>Login</button>
                }
                </Link>
            </div>
            
        </div>
    )
}

export default Navbar;