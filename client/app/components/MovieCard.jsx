"use client"
import { useRouter } from 'next/navigation';
export default function MovieCard({
  id,
  title,
  description,
  image,
  rayting,
}) {
  const router = useRouter();
  return (
    <>
      <div className="m-1 rounded-lg hover:scale-105 hover:transition-all" onClick={()=>{router.push(`/movies/${id}`)}}>
          <img
          src={image}
          className="h-72 w-48 rounded-lg"
          />
        <div>
          <h1 className="font-semibold text-xl">{title}</h1>
          <h4 className="text-movie-desc flex text-wrap">{description.substring(0, 20)}...</h4>
          <i className="fa-solid fa-star"></i> {rayting}
        </div>
      </div>
    </>
  );
}
