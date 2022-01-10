import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Add from './Add'

function App() {
  // 1.
  const [livre, setLivre] = useState([]);
  // 2.
  const getLivre = () => {
    axios.get("http://localhost:3000/livre").then((res) => {
      setLivre(res.data);
      
    });
  };
  // 3.
  useEffect(() => {
    getLivre();
  }, [livre]);
  return (
    <div className="App">
      <h1>Hello world</h1>
      <div className="reviews">
        {livre.map((item) => {
          return (
            <div className="review">
              <h3>Title: {item.book_title}</h3>
              <h3>Review: {item.book_review}</h3>
              <h3>Rating: {item.book_rating}</h3>
            </div>
          );
        })}
      </div>
      <Add livre={livre} setLivre={setLivre} />
    </div>
  );
}

export default App;
