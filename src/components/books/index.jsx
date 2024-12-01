import { useState } from "react";
import "./index.css";
import { backend } from "./axios";
import defaultImg from "../img/book-img.jpg";

function Books() {
  const [bookInput, setBookInput] = useState("");
  const [res, setRes] = useState({});

  function findBook() {
    backend
      .get(`books/v1/volumes?q=${bookInput}`)
      .then((response) => {
        if (response.status == 200) {
          setRes(response.data.items[0].volumeInfo);
          console.log(response.data.items[0].volumeInfo);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="books">
        <div className="container">
          <div className="top-content">
            <h2>FIND YOUR</h2>
            <h1>BOOK</h1>
          </div>
          <div className="input">
            <form>
              <input
                value={bookInput}
                onChange={(e) => {
                  setBookInput(e.target.value);
                }}
                className="books-input"
                type="text"
                id=""
                placeholder="Enter Books Name"
              />
            </form>
            <button onClick={findBook} className="search-book">
              TOPISH
            </button>
          </div>
          <div className="shown-books">
            {res ? (
              <div className="book">
                <div className="books-img">
                  <img src={defaultImg} alt="" />
                </div>
                <div className="books-content">
                  <div className="books-name">
                    <h2>{res.title}</h2>
                  </div>
                  <div className="books-title">
                    <h3>Authors: {res.authors}</h3>
                    <h3>Published Date: {res.publishedDate}</h3>
                    <p>{res.description}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p>Hech Narsa Topilmadi</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Books;
