import Navbar from "../common/Navbar/navbar";
import { Link } from 'react-router-dom';
import "./homepage.css";
import bgImg from '../../assets/bg-img2.png';

const HomePage = (props) => {
    return (
        <main> 
            <Navbar page="home" />
            <div className="background-img" aria-label="Background image">
                <img src={bgImg} alt="Background" />
            </div>
            <section className="content">
                <h1>Pixify Image</h1>
                <p>Try the ultimate Image Search. Access the most advanced image search model.</p>
                <button className="content-btn">
                    <Link to="/image-generator" className="btn-text">
                        Generate image
                    </Link>
                </button>
            </section>
        </main>
    );
}

export default HomePage;
