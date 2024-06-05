"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await axios
          .get("http://localhost:8080/api/categories")
          .then((response) => {
            console.log(response.data);
            setCategories(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  const deleteQuery = async (id) => {
    try{
      await axios.delete(`http://localhost:8080/api/categories/${id}`);
      window.location.href = '/admin/categories';
    }catch(err){
      console.log(err);
    }
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center border-navbar-border">
        <div className=" shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between gap-x-6 px-6 my-2">
            <h1 className="font-semibold">Category List</h1>
            <a
              href="/admin/add_category"
              className="bg-navbar-button text-white p-1 rounded-lg hover:scale-105 hover:transition-all"
            >
              Add Category
            </a>
          </div>
          <hr />
          <table className="w-full text-sm text-left ">
            <thead className="text-xs">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category Name
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
              {categories.map((category, index) => {
                const id = category._id;
                return (
                  <tr key={index}>
                    <th scope="row" className="px-6 py-4 font-medium">
                      {category.name}
                    </th>
                    <td className="px-6 py-4">
                      <a
                        href={`/admin/edit_category/${id}`}
                        className="font-medium hover:underline"
                      >
                        Edit
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <button className="font-medium hover:underline text-red-500" onClick={()=>{deleteQuery(id)}}> Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
