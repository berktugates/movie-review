"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ActionMovies() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/movies`)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const romanticMovies = movies.filter((movie) => {
    return movie.category_id == 6;
  });
  console.log(romanticMovies);
  return (
    <>
      <Navbar />
      <div id="home" className="">
        <div id="romantic-movies" className="flex flex-col">
          <h1 className="text-2xl font-semibold flex ms-96 mt-4 py-2">
            Romantic Movies
          </h1>
          <h4 className="text-xs ms-96 text-category-desc">
            Movies that will make you feel love and affection deep within us
          </h4>
          <div
            id="movies-list"
            className="flex flex-col justify-around items-center"
          >
            <div className="flex flex-wrap w-1/2 justify-center my-4 gap-8">
              {romanticMovies.map((movie, index) => {
                return (
                  <MovieCard
                    key={index}
                    title={movie.title}
                    description={movie.description}
                    is_home={movie.is_home}
                    is_active={movie.is_active}
                    image={movie.image}
                    rayting={movie.rayting}
                    category_id={movie.category_id}
                    director_id={movie.director_id}
                    actors_id={movie.actors_id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
