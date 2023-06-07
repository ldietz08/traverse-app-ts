import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeartSolid from "../../assets/icons/heart-solid.svg";
import Heart from "../../assets/icons/heart-regular.svg";
import { useAppContext } from "../../components/context/AppContext";
import "./ExplorePage.scss";

export default function ExplorePage({ hikes }) {
  const { favorites, addToFavorites, removeFromFavorites } = useAppContext();
  const [query, setQuery] = useState("");

  const checkFaves = (id) => {
    const boolean = favorites.some((hike) => hike.id === id);
    return boolean;
  };

  return (
    <>
      <div className="search">
        <input
          className="search__body"
          type="text"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
        ></input>
      </div>
      <section className="wrapper">
        {hikes
          .filter(
            // destructure
            (hike) =>
              hike.location.toLowerCase().includes(query) ||
              hike.name.toLowerCase().includes(query) ||
              hike.difficulty.toLowerCase().includes(query)
          )
          .map(
            (
              hike //destructure
            ) => (
              <div className="card" key={hike.id}>
                <div className="card__body">
                  <img
                    className="card__img"
                    src={hike.image}
                    alt="Moutainous region"
                  />
                  <div className="card__fave">
                    <h2 className="card__title">{hike.name}</h2>
                    {checkFaves(hike.id) ? (
                      <button
                        className="card__btn-fav"
                        onClick={() => removeFromFavorites(hike.id)}
                      >
                        <img
                          className="card__heart card__heart-solid"
                          src={HeartSolid}
                          alt="Solid Heart icon"
                        />
                      </button>
                    ) : (
                      <button
                        className="card__btn-fav"
                        onClick={() => addToFavorites(hike)}
                      >
                        <img
                          className="card__heart"
                          src={Heart}
                          alt="Heart icon"
                        />
                      </button>
                    )}
                  </div>
                </div>
                <h2 className="card__location">{hike.location}</h2>
                <Link to={`${hike.id}`}>
                  <button className="card__button">View More</button>
                </Link>
              </div>
            )
          )}
      </section>
    </>
  );
}
