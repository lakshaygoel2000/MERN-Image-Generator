import Navbar from "../common/Navbar/navbar";
import Imagegenerator from "../ImageGenerator/imageGenerator";
import "./homepage.css";
import {Link} from 'react-router-dom';

const HomePage = (props) => {
    return(
        <div> 
            <Navbar page="home"/>
                <div class= "content">
                    <h1>Image Generator</h1>
                    <p>Generate designs with a powerful online image generator. Simplify your process to an image in seconds using just text descriptions.</p>
                    <button><Link to="/image-generator">Generate Images Now</Link></button>
                </div>
        </div>
    )
}

export default HomePage;