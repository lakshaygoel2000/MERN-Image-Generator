import Navbar from "../common/Navbar/navbar";
import {useState} from "react";
import "./signup.css"
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleClick = async() => {
        if(!email && !password){
            return alert("All fields are Required");
        }
        navigate ("/image-generator");
        // const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/signup`, {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     method: 'POST',
        //     body: JSON.stringify({email, password})
        // });
        // const data = await res.json();
        // console.log(data);
    }

    return (
        <div>
            <Navbar page='signup'/>
            <div class="signup-box">
                <div class="welcome-container">
                    <h2>Welcome to Pixify Image</h2>
                </div>
                <input type="text" placeholder="👤 Username" onChange={(e)=>setEmail(e.target.value)} required/>
                <input type="password" placeholder="🔐 Password" onChange={(e)=>setPassword(e.target.value)} required/>
                <div className="login-option">
                    <button onClick={handleClick} className="login">Sign up</button>
                    <button onClick={handleClick} className="login">Login</button>
                </div>
            </div>
        </div>
    )
}

export default Signup;