import Navbar from "../common/Navbar/navbar";
import Imagegenerator from "../ImageGenerator/imageGenerator";
import "./homepage.css";
import {Link} from 'react-router-dom';

const HomePage = (props) => {
    return(
        <div> 
            <Navbar page="home"/>
                <div class= "content">
                    <h1>AI 3D Image Generator</h1>
                    <p>Generate 3D designs with a powerful online AI 3D image generator, Fotor. Simplify your process to a 3D AI image in seconds using just text descriptions.</p>
                    <button><Link to="/image-generator">Generate 3D Images Now</Link></button>
                </div>
        </div>
    )
}

export default HomePage;