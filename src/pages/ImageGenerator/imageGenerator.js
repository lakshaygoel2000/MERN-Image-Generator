import PointsContext from "../../context/pointsContext";
import Navbar from "../common/Navbar/navbar";
import "./imageGenerator.css"
import React, {useRef, useState, useContext, useEffect} from "react";

const APIKEY = process.env.API_KEY ;  //provide your API KEY

const ImageGenerator = () => {
  const cValue = useContext(PointsContext);
  const [imageUrls, setImageUrls] = useState([]); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false);
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

  const fetchImages = async (page, query) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.unsplash.com/search/photos?client_id=${APIKEY}&page=${page}&query=${query}`);
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);

      }
      const data = await res.json();
      const imageData = data.results.slice(0, 9).map(result => ({
        url: result.urls.regular,
        slug: result.alt_description || Untitled,
        download: result.links.download
      }));
      // console.log(imageData);
      setImageUrls(imageData); 
      setTotalPages(data.total_pages);

    } catch (err) {
      setError(err.message);
      setImageUrls([]);
    } finally {
      setLoading(false);
    }
  };
  const handleClick = async () => {
    const query = inputRef.current.value.trim();
    if (query === "") {
      setError("Please enter a prompt");
      return;
    }
    cValue.setUserPoints(cValue.userPoints - 1);
    setCurrentPage(1);
    setSearchHistory((prevHistory) => [...prevHistory, query]);
    await fetchImages(1, query);
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      await fetchImages(nextPage, inputRef.current.value.trim());
    }
  };

  const handlePrevPage = async () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      await fetchImages(prevPage, inputRef.current.value.trim());
    }
  };

  return (
    <div className="img-generate-page">
      <Navbar page="imageGenerator" />
      <div className="image-generator-search-container">
        <div className="image-search">
          <input type="text" placeholder="Search Query" ref={inputRef} onKeyDown={(e)=>{if(e.key === 'Enter'){handleClick()}}}  aria-label="Search Query" />
          <button onClick={(e)=>handleClick()} className="search-btn" disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
      </div>
      {error && <div className="error-message" role="alert">{error}</div>}
      <div className="image-grid">
        {imageUrls.length > 0 ? (
          imageUrls.map((image, index) => (
            <div key={index} className="image-container">
              <img src={image.url} alt={`Generated result ${index + 1}`} />
              <p className="image-slug"><a href={image.download} target="_blank" rel="noopener noreferrer">{image.slug}</a></p>
            </div>
          ))
        ) : (
          !loading
        )}
      </div>
      <div className="pagination">
        {imageUrls.length > 0 ? (
          <>
            <button onClick={handlePrevPage} disabled={currentPage === 1 || loading}>
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages || loading}>
              Next
            </button>
          </>
          ) : (
            ""
          )}
        </div>
    </div>
  );
};

export default ImageGenerator;
