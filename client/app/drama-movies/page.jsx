"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DramaMovies() {
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
  const dramaMovies = movies.filter((movie) => {
    return movie.category_id == 2;
  });
  console.log(dramaMovies);
  return (
    <>
      <Navbar />
      <div id="home" className="">
        <div id="drama-movies" className="flex flex-col">
          <h1 className="text-2xl font-semibold flex ms-96 mt-4 py-2">
            Drama Movies
          </h1>
          <h4 className="text-xs ms-96 text-category-desc">
            Get the napkins ready! If you want to cry, you are in the right
            place.
          </h4>
          <div
            id="movies-list"
            className="flex flex-col justify-around items-center"
          >
            <div className="flex flex-wrap w-1/2 justify-center my-4 gap-8">
              {dramaMovies.map((movie, index) => {
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
