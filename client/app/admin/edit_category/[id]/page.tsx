"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function EditCategory() {
  const pathname = usePathname();
  const id = pathname.split('/')[3];
  const [name , setName] = useState('');
  const r = useRouter();
  useEffect(()=>{
    const fetchCategory = () =>{
      axios
      .get(`http://127.0.0.1:8080/api/categories/${id}`)
      .then((response)=>{
        console.log(response.data);
        setName(response.data.name);
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    fetchCategory();
  },[])
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await axios
      .put(`http://127.0.0.1:8080/api/categories/${id}`,{
        name : name
      })
      setName('')
      r.back();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold my-2">Edit Category</h1>
        <div id="form" className="border p-2">
          <ul>
            <form action="" method="PUT" onSubmit={handleSubmit}>
              <li className="flex flex-col gap-x-8 my-2 p-2">
                <label htmlFor="name">Edit Name</label>
                <input
                  id="name"
                  value={name}
                  onChange={(e)=>{
                    setName(e.target.value)
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
