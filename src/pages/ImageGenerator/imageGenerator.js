import PointsContext from "../../context/pointsContext";
import Navbar from "../common/Navbar/navbar";
import "./imageGenerator.css"
import default_image from '../ImageGenerator/default_image.png'
import React, {useRef, useState, useContext, useEffect} from "react";

const APIKEY = process.env.API_KEY ;  //provide your API KEY

const ImageGenerator = () => {
  const cValue = useContext(PointsContext);
  const [imageUrls, setImageUrls] = useState([]); 
  const [error, setError] = useState(null); 
  const inputRef = useRef(null);
  const [searchHistory, setSearchHistory] = useState([]); // to store search history
  const [currentPage, setCurrentPage] = useState(1); //  to keep track of the current page
  const [totalPages, setTotalPages] = useState(1); // to keep track of the total pages

  useEffect(() => {
    // Read search history from localStorage
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    // Writing search history to localStorage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleClick = async () => {
    try {
      if (inputRef.current.value === "") {
        setError("Please enter a prompt");
        return;
      }

      cValue.setUserPoints(cValue.userPoints - 1);
      
      const res = await fetch(`https://api.unsplash.com/search/photos?client_id=${APIKEY}&page=${currentPage}&query=${inputRef.current.value}`, 
      );
      const data = await res.json();
      console.log(data);    
      const imageUrlsArray = data.results.map(result => result.urls.small);
      setImageUrls(imageUrlsArray.slice(0, 9)); // Show only 9 results per page
      setTotalPages(data.total_pages);
      setSearchHistory((prevHistory) => [...prevHistory, inputRef.current.value]);
    } 
    catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      handleClick();
    }
  };

  const handlePrevPage = async () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      handleClick();
    }
  };

  return (
    <div>
      <Navbar page="imageGenerator" />
      <div className="image-generator-search-container">
        <div className="image-search">
          <input type="text" placeholder="Search Query" ref={inputRef} />
          <button onClick={handleClick}>Generate</button>
        </div>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
      <div className="image-grid">
        {imageUrls.map((imageUrl, index) => (
          <img key={index} src={imageUrl}  />
        ))}
      </div>
    </div>
  );
};

export default ImageGenerator;