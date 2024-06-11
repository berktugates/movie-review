"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Review from "@/app/components/Review";
import axios from "axios";

export default function Movie() {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const [movie, setMovie] = useState({});
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

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

    axios
      .get(`http://localhost:8080/api/reviews`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const minute = movie.duration % 60;
  const hour = (movie.duration - minute) / 60;

  const handleAddComment = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/reviews", {
        movie_id: id,
        name: name,
        comment,
        comment,
      });
      setName("");
      setComment("");
      setShowModal(false);
      setReviews([response.data, ...reviews]);
    } catch (err) {
      console.log(err);
    }
  };
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
                  <li className="text-lg font-semibold">{movie.rating} |</li>
                  <li className="text-lg">{movie.release_year}</li>
                  <li className="text-lg">
                    {hour}h {minute}m
                  </li>
                </ul>
                <p className="bg-category-bg font-semibold border w-20 py-1 px-2 mt-1 rounded-lg">
                  {movie.category_name}
                </p>
              </div>
              <div className="mt-4">
                <h1 className="font-semibold">Director</h1>
                <h1 className="text-gray-400">Gareth Edwards</h1>
                <h1 className="font-semibold">Actors</h1>
                <ul className="flex gap-2">
                  {movie.actors_name && movie.actors_name.length > 0 ? (
                    movie.actors_name.map((actor, index) => (
                      <li className="text-gray-400" key={index}>
                        {actor},
                      </li>
                    ))
                  ) : (
                    <li>No actors available</li>
                  )}
                </ul>
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
        <div className="mx-auto w-2/5 mt-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Reviews</h1>
            <button
              className="p-2 rounded-lg bg-navbar-button text-white hover:scale-105 hover:transition-all"
              onClick={() => setShowModal(true)}
            >
              Add Comment
            </button>
          </div>
          <div className="my-4">
            {reviews.map(
              (review) =>
                review.movie_id === id && (
                  <Review
                    id={review._id}
                    name={review.name}
                    comment={review.comment}
                  />
                )
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <>
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-2xl mb-4">Add Comment</h2>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />
              <textarea
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />
              <button
                onClick={handleAddComment}
                className="bg-purple-600 text-white px-4 py-2 rounded mr-2"
              >
                Submit
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
