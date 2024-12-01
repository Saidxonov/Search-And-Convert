import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import GitHub from "./components/github/index.jsx";
import Books from "./components/books/index.jsx";

function App() {
  const [rate, setRate] = useState(null);
  const [field, setField] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = `a12999da15-0ef8473b2b-snrilr`;

  useEffect(() => {
    axios
      .get(
        `https://api.fastforex.io/fetch-one?from=USD&to=EUR&api_key=${API_KEY}`
      )
      .then((response) => {
        setRate(response.data.result.EUR);
      })
      .catch((err) => {
        setError(
          "Valyuta kursini yuklab bo‘lmadi. Iltimos, qayta urinib ko‘ring."
        );
        console.error(err);
      });
  }, [API_KEY]);

  function handleClick(event) {
    event.preventDefault();
    if (field && rate) {
      const data = (field * rate).toFixed(2);
      setResult(data);
    } else {
      setError("Iltimos, to‘g‘ri qiymat kiriting!");
    }
  }

  return (
    <div>
      <div className="container">
        <div className="top-content">
          <h2>Xush Kelibsiz</h2>
          <h1>Valyuta Konvertori</h1>
        </div>
        <div className="form">
          <form>
            <div className="input-usd">
              <h2>USD</h2>
              <input
                value={field}
                onChange={(e) => setField(e.target.value)}
                type="number"
                required
                min="0"
              />
            </div>
          </form>
          <h1>=</h1>
          <div className="eur-content">
            <h2>EUR</h2>
            <h2>{result}</h2>
          </div>
        </div>
        <button className="convert-button" onClick={handleClick}>
          Konvertatsiya
        </button>
        {error && <p className="error">{error}</p>}

        <GitHub />
        <Books />
      </div>
    </div>
  );
}

export default App;
