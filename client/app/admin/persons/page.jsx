"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Categories() {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    const fetchPersons = () => {
      axios
        .get("http://127.0.0.1:8080/api/persons")
        .then((response) => {
          setPersons(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchPersons();
  }, []);

  const deleteQuery = async(id) =>{
    try{
      await axios.delete(`http://127.0.0.1:8080/api/persons/${id}`)
      window.location.href = '/admin/persons';
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <div className="h-screen flex justify-center items-center border-navbar-border">
        <div className=" shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between px-6 my-2">
            <h1 className="font-semibold">Person List</h1>
            <a
              href="/admin/add_person"
              className="bg-navbar-button text-white p-1 rounded-lg hover:scale-105 hover:transition-all"
            >
              Add Person
            </a>
          </div>
          <hr />
          <table className="w-full text-sm text-left ">
            <thead className="text-xs">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Person Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
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
              {persons.map((person, index) => {
                const id = person._id;
                return (
                  <tr key={index}>
                    <th scope="row" className="px-6 py-4 font-medium">
                      {person.name}
                    </th>
                    <td className="px-6 py-4">
                      <p className="font-medium">
                        {person.role}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <a href={`/admin/edit_person/${person._id}`} className="font-medium hover:underline">
                        Edit
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <button className="font-medium hover:underline text-red-500" onClick={()=>{
                        deleteQuery(id)
                      }}>
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
    </>
  );
}
