import PointsContext from "../../context/pointsContext";
import Navbar from "../common/Navbar/navbar";
import "./imageGenerator.css"
import default_image from '../ImageGenerator/default_image.png'
import React, {useRef, useState, useContext, useEffect} from "react";

const APIKEY = process.env.API_KEY ;  //provide your API KEY

const ImageGenerator = () => {
  const cValue = useContext(PointsContext);
  const [image_url, setImg_url] = useState("/");
  const [error, setError] = useState(null); 
  const inputRef = useRef(null);
  const [i, setI]=useState(0);
  const [searchHistory, setSearchHistory] = useState([]); // Add this state to store search history

  useEffect(() => {
    // Read search history from localStorage
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    // Write search history to localStorage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleClick = async () => {
    try {
      if (inputRef.current.value === "") {
        setError("Please enter a prompt");
        return;
      }

      cValue.setUserPoints(cValue.userPoints - 1);
      
      const res = await fetch(`https://api.unsplash.com/search/photos?client_id=${APIKEY}&page=1&query=${inputRef.current.value}`, 
      );
      const data = await res.json();
      console.log(data);    
      const imageUrl = data.results[i].urls.raw;
      setImg_url(imageUrl);

      // Add current search query to search history
      setSearchHistory((prevHistory) => [...prevHistory, inputRef.current.value]);
    } 
    catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div>
      <Navbar page="imageGenerator" />
      <div className="image-generator-main-container">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        <img src={image_url === "/"? default_image : image_url} />
          <button class="prev-move" onClick={()=>{setI(i-1); handleClick();}}>Prev</button>
          <button class="next-move" onClick={()=>{setI(i+1); handleClick();}}>Next</button>
        <div className="image-generator-search-container">
          <div className="image-search">
            <input type="text" ref={inputRef} />
            <button onClick={handleClick}>Generate</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;