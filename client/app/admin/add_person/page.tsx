"use client";
import { useState } from "react";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/navigation";

export default function AddPerson() {
  const r = useRouter();
  const [name, setName] = useState("");
  const [date_of_birthday, setDate_of_birthday] = useState(
    moment().format("DD-MM-YYYY")
  );
  const [nationality, setNationality] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async(e: React.SyntheticEvent) => {
    e.preventDefault();
    try{
      const response = await axios.post("http://127.0.0.1:8080/api/persons", {
      name: name,
      date_of_birthday: date_of_birthday,
      nationality: nationality,
      role: role,
    });
    console.log(response.data);
    setName('');
    setNationality('');
    setRole('');
    r.back();
    }catch(err){
      console.log(err);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold my-2">Add Person</h1>
        <div id="form" className="border p-2">
          <ul>
            <form action="" method="POST" onSubmit={handleSubmit}>
              <li className="flex flex-col gap-x-8 my-2 p-2">
                <label htmlFor="name">Add Name</label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="border rounded-md h-8"
                  type="text"
                />
              </li>
              <li className="flex flex-col gap-x-8 my-2 p-2">
                <label htmlFor="date_of_birthday">Add Date of Birthday</label>
                <input
                  id="date_of_birthday"
                  value={date_of_birthday}
                  onChange={(e) => {
                    const newDate = moment(e.target.value).format(
                      "YYYY-MM-DD"
                    );
                    setDate_of_birthday(newDate);
                  }}
                  className="border rounded-md p-1 justify-start"
                  type="date"
                />
              </li>
              <li className="flex flex-col gap-x-4 my-2 p-2">
                <label htmlFor="nationality">Nationality</label>
                <input
                  id="nationality"
                  value={nationality}
                  onChange={(e)=>{
                    setNationality(e.target.value);
                  }}
                  className="border rounded-md"
                  type="text"
                />
              </li>
              <li className="flex flex-col gap-x-4 my-2 p-2">
                <label htmlFor="role">Role</label>
                <input
                  id="role"
                  value={role}
                  onChange={(e)=>{
                    setRole(e.target.value)
                  }}
                  className="border rounded-md"
                  type="text"
                />
              </li>
            </form>
          </ul>
          <div className="flex justify-center">
            <button
              className="p-2 rounded-lg bg-green-500 text-white"
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
