"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import axios from "axios";
export default function Movie() {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const [movie, setMovie] = useState({});
  const [director, setDirector] = useState("");
  const [category, setCategory] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/movies/${id}`)
      .then((response) => {
        console.log(response.data);
        setMovie(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Navbar />
      <div id="container">
        <div id="movie-info" className="flex justify-center bg-gray-100">
          <div id="left" className="flex gap-4 border-r p-2">
            <img
              className="rounded-lg"
              src={movie.image}
              alt={movie.title}
              width={300}
            />
            <div className="flex flex-col">
              <div>
                <h1 className="text-2xl font-semibold">{movie.title}</h1>
                <ul className="flex gap-4">
                  <li className="text-lg font-semibold">{movie.rayting} |</li>
                  <li className="text-lg">2016</li>
                  <li className="text-lg">2h 13m</li>
                </ul>
                <p className="bg-blue-300 w-24 text-center p-1 mt-1 rounded-lg">
                  Adventure
                </p>
              </div>
              <div className="mt-4">
                <h1 className="font-semibold">Director</h1>
                <h1 className="text-gray-400">Gareth Edwards</h1>
              </div>
            </div>
          </div>
          <div
            id="right"
            className="flex flex-col gap-4 p-2 w-full md:w-1/2 lg:w-1/3"
          >
            <h1 className="text-2xl font-semibold">Storyline</h1>
            <p className="break-words whitespace-normal">{movie.description}</p>
          </div>
        </div>
        <div className="mx-auto w-2/3 mt-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Reviews</h1>
            <a className="p-2 rounded-lg bg-navbar-button text-white" href="">Add Comment</a>
          </div>
          <div id="comments" className="border mt-4">
            <h1>Berktug Berke Ates</h1>
            <p>Lorem ipsum film harika</p>
          </div>
        </div>
      </div>
    </>
  );
}
