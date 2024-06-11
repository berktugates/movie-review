"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddMovie() {
  const r = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isHome, setIsHome] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);
  const [duration, setDuration] = useState(0);
  const [directorId, setDirectorId] = useState("");
  const [actorsNames, setActorsNames] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/movies", {
        title:title,
        description:description,
        is_home:isHome,
        is_active:isActive,
        image:image,
        rating:rating,
        category_name: categoryName,
        release_year : releaseYear,
        duration : duration,
        director_id: directorId, 
        actors_name: actorsNames,
      });

      setTitle("");
      setDescription("");
      setIsHome(false);
      setIsActive(false);
      setImage("");
      setRating("");
      setCategoryName("");
      setReleaseYear(0);
      setDuration(0);
      setDirectorId("");
      setActorsNames([]);
      r.back();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold my-2">Add Movie</h1>
        <div id="form" className="border p-2">
          <ul>
            <form action="" method="POST" onSubmit={handleSubmit}>
              <li className="flex flex-col gap-x-8 my-2 p-2">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border rounded-md h-8"
                  type="text"
                />
              </li>
              <li className="flex flex-col gap-x-8 my-2 p-2">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border rounded-md h-24"
                />
              </li>
              <li className="flex gap-x-8 my-2 p-2">
                <label>Is Home</label>
                <input
                  type="checkbox"
                  id="isHome"
                  value={isHome}
                  checked={isHome}
                  onChange={(e) => setIsHome(e.target.checked)}
                />
              </li>
              <li className="flex gap-x-8 my-2 p-2">
                <label>Is Active</label>
                <input
                  type="checkbox"
                  id="isActive"
                  value={isActive}
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
              </li>
              <li className="flex flex-col gap-x-8 my-2 p-2">
                <label htmlFor="image">Image URL</label>
                <input
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="border rounded-md h-8"
                  type="text"
                />
              </li>
              <li className="flex flex-col gap-x-8 my-2 p-2">
                <label htmlFor="rating">Rating</label>
                <input
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="border rounded-md h-8"
                  type="number"
                  min={1}
                  max={10}
                />
              </li>
              <li className="flex flex-col gap-x-8 my-2 p-2">
                <label htmlFor="categoryName">Category Name</label>
                <input
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="border rounded-md h-8"
                  type="text"
                />
              </li>
              <li className="flex flex-col gap-x-8 my-2 p-2">
                <label htmlFor="releaseYear">Release Year</label>
                <input
                  id="releaseYear"
                  value={releaseYear}
                  onChange={(e) => setReleaseYear(e.target.value)}
                  className="border rounded-md h-8"
                  type="number"
                />
              </li>
              <li className="flex flex-col gap-x-8 my-2 p-2">
                <label htmlFor="duration">Duration (Minute)</label>
                <input
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="border rounded-md h-8"
                  type="number"
                />
              </li>
              <li className="flex flex-col gap-x-8 my-2 p-2">
                <label htmlFor="directorId">Director ID</label>
                <input
                  id="directorId"
                  value={directorId}
                  onChange={(e) => setDirectorId(e.target.value)}
                  className="border rounded-md h-8"
                  type="text"
                />
              </li>
              <li className="flex flex-col gap-x-8 my-2 p-2">
                <label htmlFor="actors">Actors</label>
                <input
                  id="actors"
                  value={actorsNames.join(",")}
                  onChange={(e) => {
                    const names = e.target.value
                      .split(",")
                      .map((name) => name.trim());
                    setActorsNames(names);
                  }}
                  className="border rounded-md h-8"
                  type="text"
                />
              </li>
            </form>
          </ul>
          <div className="flex justify-center">
            <button
              className="p-2 rounded-lg bg-green-500 text-white"
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
