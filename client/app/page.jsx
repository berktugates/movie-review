"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const visionMovies = movies.slice(-4);
  const popular = movies.filter((movie) => {
    return movie.rayting > 7;
  });
  const popularMovies = popular.slice(-4);
  const christopherNolanFilms = movies.filter((movie) => {
    return movie.director_id == 1;
  });

  const demirkubuz = movies.filter((movie)=>{
    return movie.director_id == 5;
  })
  const demirkubuzMovies = demirkubuz.slice(-4);
  return (
    <>
      <Navbar />
      <div id="home" className="">
        <div
          id="those-in-the-vision"
          className="flex flex-col justify-around bg-visions-bg"
        >
          <h1 className="text-2xl font-semibold flex ms-96 mt-4 py-2">
            Recently Added
          </h1>
          <h4 className="text-xs ms-96 text-category-desc">
            Reviews of the latest movies added this week are here!
          </h4>
          <div className="flex justify-center my-4 gap-8">
            {visionMovies.map((movie, index) => {
              return (
                <MovieCard
                  key={index}
                  id={movie._id}
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
        <div id="popular-movies" className="my-4">
          <h1 className="text-2xl ms-96 font-semibold py-2">Popular Movies</h1>
          <h4 className="text-xs ms-96 text-category-desc">
            Here are the movies that make the audience fall in love with them!
          </h4>
          <div
            id="movies-list"
            className="flex flex-col justify-around items-center"
          >
            <div className="flex flex-wrap w-1/2 justify-center items-center my-4 gap-8">
              {popularMovies.map((popular, index) => {
                return (
                  <MovieCard
                    key={index}
                    title={popular.title}
                    description={popular.description}
                    rayting={popular.rayting}
                    image={popular.image}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div id="nolan-movies" className="my-4">
          <h1 className="text-2xl font-semibold ms-96 py-2">
            Christopher Nolan : Favorites
          </h1>
          <h4 className="text-xs ms-96 text-category-desc">
            Christopher Nolan's unique masterpieces
          </h4>
          <div className="flex flex-col justify-around items-center">
            <div className="flex flex-wrap w-1/2 justify-center items-center my-4 gap-8">
              {christopherNolanFilms.map((nolan, index) => {
                return (
                  <MovieCard
                    key={index}
                    title={nolan.title}
                    description={nolan.description}
                    rayting={nolan.rayting}
                    image={nolan.image}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div id="demirkubuz-movies" className="my-4">
          <h1 className="text-2xl font-semibold ms-96 py-2">
            Demirkubuz : Favorites
          </h1>
          <h4 className="text-xs ms-96 text-category-desc">
            Zeki Demirkubuz's unique masterpieces
          </h4>
          <div className="flex flex-col justify-around items-center">
            <div className="flex flex-wrap w-1/2 justify-center items-center my-4 gap-8">
              {demirkubuzMovies.map((demirkubuz, index) => {
                return (
                  <MovieCard
                    key={index}
                    title={demirkubuz.title}
                    description={demirkubuz.description}
                    rayting={demirkubuz.rayting}
                    image={demirkubuz.image}
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
