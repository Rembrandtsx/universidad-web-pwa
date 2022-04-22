import React, { useEffect, useState } from "react";

import "./App.css";
import md5 from "blueimp-md5";
function App() {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("heroes") === null) {
        setHeroes([]);
      } else {
        setHeroes(JSON.parse(localStorage.getItem("heroes")));
      }
    } else {
      const ts = +new Date();
      const ak = "0ee2c229433f936f2ba9c574815fe003";
      const pk = "d5b24238f22b25c8ab8b7b39518408236066b5aa";
      const params = `?ts=${ts}&apikey=${ak}&hash=${md5(ts + pk + ak)}`;
      const URL = `http://gateway.marvel.com/v1/public/characters${params}`;
      fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          setHeroes(res.data.results);
          console.log(res);
          localStorage.setItem("heroes", JSON.stringify(res.data.results));
        });
    }
  }, []);

  return (
    <>
      <div className="heroesGrid">
        {heroes.length !== 0
          ? heroes.map((el, i) => <Hero heroe={el} key={i} />)
          : "Cargando..."}
      </div>
    </>
  );
}
function Hero({ heroe }) {
  return (
    <div className="heroe">
      <img
        style={{
          clipPath: `polygon(${ran()} ${ran()}%, ${ran()}% ${ran()}%, ${ran()}%
          ${ran()}%, ${ran()}% ${ran()}%, ${ran()}% ${ran()}%)`,
        }}
        src={heroe.thumbnail.path + "." + heroe.thumbnail.extension}
        alt=""
      />
      <h4>{heroe.name}</h4>

      {heroe.description && <p>{heroe.description}</p>}
    </div>
  );
}

function ran() {
  // min and max included
  return Math.floor(Math.random() * (100 - 0 + 1) + 0);
}
export default App;
