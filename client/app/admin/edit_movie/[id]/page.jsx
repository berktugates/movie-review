"use client";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function () {
  const pathname = usePathname();
  const id = pathname.split('/')[3];

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [is_home, setIs_home] = useState();
  const [is_active, setIs_active] = useState();
  const [image, setImage] = useState('');
  const [rating, setRating] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);
  const [duration, setDuration] = useState(0);
  const [director_id, setDirectorId] = useState(0);
  const [actorsNames, setActorsNames] = useState([]);

  const r = useRouter();

  useEffect(()=>{
    const fetchMovie = ()=>{
        axios
        .get(`http://127.0.0.1:8080/api/movies/${id}`)
        .then((response)=>{
            setTitle(response.data.title);
            setDescription(response.data.description);
            setIs_home(response.data.is_home);
            setIs_active(response.data.is_active);
            setImage(response.data.image);
            setRating(response.data.rating);
            setCategoryName(response.data.category_name);
            setReleaseYear(response.data.release_year);
            setDuration(response.data.duration);
            setDirectorId(response.data.director_id);
            setActorsNames(response.data.actors_name);
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    fetchMovie();
  },[])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const response = await axios.put(`http://localhost:8080/api/movies/${id}`,{
        title : title,
        description:description,
        is_home : is_home,
        is_active : is_active,
        image : image,
        rating : rating,
        category_name : categoryName,
        release_year : releaseYear,
        duration : duration,
        director_id, director_id,
        actors_name : actorsNames
      });
      r.back();
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold my-2">Edit Movie</h1>
        <div id="form" className="border p-2">
          <ul>
            <form action="" method="PUT" onSubmit={handleSubmit}>
              <li className="flex flex-col gap-x-8 my-2 p-2">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border rounded-md h-8 p-1"
                  type="text"
                />
              </li>
              <li className="flex flex-col gap-x-8 my-2 p-2">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border rounded-md h-24 p-1"
                />
              </li>
              <li className="flex gap-x-8 my-2 p-2">
                <label>Is Home</label>
                <input
                  type="checkbox"
                  id="isHome"
                  value={is_home}
                  checked={is_home ? true : false}
                  onChange={(e) => setIs_home(e.target.checked)}
                />
              </li>
              <li className="flex gap-x-8 my-2 p-2">
                <label>Is Active</label>
                <input
                  type="checkbox"
                  id="isActive"
                  value={is_active}
                  checked={is_active ? true : false}
                  onChange={(e) => setIs_active(e.target.checked)}
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
                  className="border rounded-md h-8 p-1"
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
                  className="border rounded-md h-8 p-1"
                  type="text"
                />
              </li>
              <li className="flex flex-col gap-x-8 my-2 p-2">
                <label htmlFor="releaseYear">Release Year</label>
                <input
                  id="releaseYear"
                  value={releaseYear}
                  onChange={(e) => setReleaseYear(e.target.value)}
                  className="border rounded-md h-8 p-1"
                  type="text"
                />
              </li>
              <li className="flex flex-col gap-x-8 my-2 p-2">
                <label htmlFor="duration">Duration (Minute)</label>
                <input
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="border rounded-md h-8 p-1"
                  type="text"
                />
              </li>
              <li className="flex flex-col gap-x-8 my-2 p-2">
                <label htmlFor="directorId">Director ID</label>
                <input
                  id="directorId"
                  value={director_id}
                  onChange={(e) => setDirectorId(e.target.value)}
                  className="border rounded-md h-8 p-1"
                  type="number"
                  min={1}
                  max={10}
                />
              </li>
              <li className="flex flex-col gap-x-8 my-2 p-2">
                <label htmlFor="actors">Actors</label>
                <textarea
                  id="actors"
                  value={actorsNames}
                  onChange={(e) => {
                    const names = e.target.value
                      .split(",")
                      .map((name) => name.trim());
                    setActorsNames(names);
                  }}
                  className="border rounded-md h-8 p-1"
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
