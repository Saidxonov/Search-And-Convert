import { useState } from "react";
import "./index.css";
import { users } from "./axios";

function GitHub() {
  const [user, setUser] = useState("");
  const [star, setStar] = useState([]);

  function handleGithub(e) {
    e.preventDefault();
    users
      .get(`users/${user}/repos`)
      .then((response) => {
        if (response.status == 200) {
          const filteringUser = response.data.filter(
            (data) => data.stargazers_count > 10
          );
          setStar(filteringUser);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div className="top-content">
        <h1>GitHub Repositories</h1>
      </div>
      <div className="form">
        <form>
          <input
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
            className="github-user"
            type="text"
            placeholder="Username kiriting!"
          />
          <button onClick={handleGithub} className="github-user-btn">
            Korish
          </button>
        </form>
      </div>
      <div className="block">
        {star.length > 0 ? (
          star.map((value, index) => (
            <div key={index} className="card">
              <h2>Name: {value.name}</h2>
              <h3>Stars: {value.stargazers_count}</h3>
            </div>
          ))
        ) : (
          <p>Hech Narsa Topilmadi</p>
        )}
      </div>
    </div>
  );
}

export default GitHub;
