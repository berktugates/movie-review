"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = () => {
      axios
        .get("http://127.0.0.1:8080/api/movies")
        .then((response) => {
          console.log(response.data);
          setMovies(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchMovies();
  }, []);

  const firstSection = movies.slice(0, 10);
  const secondSection = movies.slice(10, 20);
  const thirdSection = movies.slice(20);
  const deleteQuery = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8080/api/movies/${id}`);
      window.location.href = "/admin/movies";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center border-navbar-border">
        <div className=" shadow-md sm:rounded-lg my-4">
          <div className="flex items-center justify-between px-6 my-2">
            <h1 className="font-semibold">Movie List</h1>
            <a
              href="/admin/add_movie"
              className="bg-navbar-button text-white p-1 rounded-lg hover:scale-105 hover:transition-all"
            >
              Add Movie
            </a>
          </div>
          <hr />
          <div className="flex">
            <table className="w-full text-sm text-left ">
              <thead className="text-xs">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Movie Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {firstSection.map((movie, index) => {
                  const id = movie._id;
                  return (
                    <tr key={index}>
                      <th scope="row" className="px-6 py-4 font-medium">
                        {movie.title}
                      </th>
                      <td className="px-6 py-4">
                        <a
                          href={`/admin/edit_movie/${movie._id}`}
                          className="font-medium hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="font-medium hover:underline text-red-500"
                          onClick={() => {
                            deleteQuery(id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <table className="w-full text-sm text-left ">
              <thead className="text-xs">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Movie Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {secondSection.map((movie, index) => {
                  const id = movie._id;
                  return (
                    <tr key={index}>
                      <th scope="row" className="px-6 py-4 font-medium">
                        {movie.title}
                      </th>
                      <td className="px-6 py-4">
                        <a
                          href={`/admin/edit_movie/${movie._id}`}
                          className="font-medium hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="font-medium hover:underline text-red-500"
                          onClick={() => {
                            deleteQuery(id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <table className="w-full text-sm text-left ">
              <thead className="text-xs">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Movie Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {thirdSection.map((movie, index) => {
                  const id = movie._id;
                  return (
                    <tr key={index}>
                      <th scope="row" className="px-6 py-4 font-medium">
                        {movie.title}
                      </th>
                      <td className="px-6 py-4">
                        <a
                          href={`/admin/edit_movie/${movie._id}`}
                          className="font-medium hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="font-medium hover:underline text-red-500"
                          onClick={() => {
                            deleteQuery(id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
