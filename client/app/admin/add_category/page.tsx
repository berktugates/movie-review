"use client"
import { useState } from "react";
import axios from "axios"; 
import { useRouter } from "next/navigation";

export default function AddCategory() {
  const [name, setName] = useState('');
  const r = useRouter();
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try{
      const response = await axios.post('http://localhost:8080/api/categories',{
        name:name
      })
      console.log(response.data);
      setName('');
      r.back();
    }
    catch(err){
      console.log(err);
    }
  };
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold my-2">Add Category</h1>
        <div id="form" className="border p-2">
          <ul>
            <form action="" method="POST" onSubmit={handleSubmit}>
              <li className="flex flex-col gap-x-8 my-2 p-2">
                <label htmlFor="name">Add Name</label>
                <input
                  id="name"
                  value={name}
                  onChange={(e)=>{
                    setName(e.target.value)
                  }}  
                  className="border rounded-md h-8"
                  type="text"
                />
              </li>
            </form>
          </ul>
          <div className="flex justify-center">
            <button className="p-2 rounded-lg bg-green-500 text-white" type="submit" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
