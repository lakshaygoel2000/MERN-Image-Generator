import PointsContext from "../../context/pointsContext";
import Navbar from "../common/Navbar/navbar";
import {useState, useContext} from "react";
import "./login.css"

const Login = () => {
    const {login} = useContext(PointsContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleClick = async() => {
        if(!email && !password){
            return;
        }
        const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify({email, password})
        });
        const data = await res.json();
        if(data.status === "success"){
            localStorage.setItem("authorization", data.data.token);
            login();
        }
    }

    return (
        <div>
            <Navbar page='login'/>
            <div class="login-box">
                <div class="social-container">
                    <a href="https://accounts.google.com/" class="social"><i class="fab fa-google-plus-g"><img src="https://www.google.com/images/branding/product/1x/gmail_48dp.png"></img></i></a>
                    <a href="https://www.linkedin.com/login" class="social"><i class="fab fa-linkedin-in"><img src="https://th.bing.com/th/id/R.14f8d0d8ea255a03471032d79087fdf0?rik=Jcph23UZL08iCA&riu=http%3a%2f%2f1000logos.net%2fwp-content%2fuploads%2f2017%2f03%2fColor-of-the-LinkedIn-Logo.jpg&ehk=hT5Ibkg%2fFPa%2f7TPm%2fs2TP8Fxdd7ySQQBuZmn88xh5j0%3d&risl=&pid=ImgRaw&r=0"></img></i></a>
                </div>
                <input type="text" placeholder="Username" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={handleClick}>Login</button>
            </div>
        </div>
    )
}

export default Login;