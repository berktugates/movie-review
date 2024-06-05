"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddMovie() {
  const r = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isHome, setIsHome] = useState(false); // Initial checkbox state
  const [isActive, setIsActive] = useState(false); // Initial checkbox state
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0); // Corrected typo: rating instead of rayting
  const [categoryId, setCategoryId] = useState(0);
  const [directorId, setDirectorId] = useState(0);
  const [actorsIds, setActorsIds] = useState([]); // Array for multiple actor IDs

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/movies", {
        title:title,
        description:description,
        is_home:isHome,
        is_active:isActive,
        image:image,
        rayting:rating, // Corrected typo
        category_id: categoryId, // Lowercase 'category' for consistency
        director_id: directorId, // Lowercase 'director' for consistency
        actors_id: actorsIds, // Use 'actors' for clarity
      });

      setTitle("");
      setDescription("");
      setIsHome(false);
      setIsActive(false);
      setImage("");
      setRating("");
      setCategoryId("");
      setDirectorId("");
      setActorsIds([]);
      r.back();
    } catch (err) {
      console.error(err);
      // Handle errors appropriately (e.g., display error message to user)
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
                <label htmlFor="categoryId">Category ID</label>
                <input
                  id="categoryId"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="border rounded-md h-8"
                  type="number"
                  min={1}
                  max={10}
                />
              </li>
              <li className="flex flex-col gap-x-8 my-2 p-2">
                <label htmlFor="directorId">Director ID</label>
                <input
                  id="directorId"
                  value={directorId}
                  onChange={(e) => setDirectorId(e.target.value)}
                  className="border rounded-md h-8"
                  type="number"
                  min={1}
                />
              </li>
              <li className="flex flex-col gap-x-8 my-2 p-2">
                <label htmlFor="actors">Actors (IDs separated by commas)</label>
                <input
                  id="actors"
                  value={actorsIds.join(",")}
                  onChange={(e) => {
                    const ids = e.target.value
                      .split(",")
                      .map((id) => id.trim());
                    setActorsIds(ids);
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
