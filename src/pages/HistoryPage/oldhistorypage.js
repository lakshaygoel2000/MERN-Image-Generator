import Navbar from "../common/Navbar/navbar";
import {useState, useEffect} from "react";
import "./historyPage.css";

const HistoryPage = () => {
    const[title, setTitle] = useState("Images");
    const[description, setDescription] = useState("These are Images");


    useEffect(()=>{
        console.log('Nothing = Every time when the page is re0-rendered')
    });

    useEffect(()=>{
        console.log('Only when the page is rendered first time')
    },[]);

    useEffect(()=>{
        console.log('Only when "title" is changed')
    },[title]);

    useEffect(()=>{
        console.log('When "title" _or_ "description" is changed')
    },[title, description]);


    return (
        <div>
            <Navbar />
            <div className="history-main-container">
                
                <input value={title} onChange={(e)=>{setTitle(e.target.value)}}/><br />
                <input  value={description} onChange={(e)=>{setDescription(e.target.value)}}/><br />

                <h3>Title = {title}</h3>
                <h3>description = {description}</h3>

            </div>
        </div>
    )
};

export default HistoryPage;