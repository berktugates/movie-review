"use client"
import axios from "axios";
import { useState, useEffect } from "react"

export default function Home() {
  const [message ,setMessage] = useState('loading');

  useEffect(()=>{
    axios.get('http://localhost:8080/api/home')
    .then((response)=>{
        setMessage(response.data.message);
    })
    .catch((err)=>{
      console.log(err)
    })
  })
  return (
    <>
      <div>
        {message}
      </div>
    </>
  )
}
