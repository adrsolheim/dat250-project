import React, { useRef, useState, useParams } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory, useLocation } from "react-router-dom"


export default function Voted() {
   
    const location = useLocation();

  return (
    <>
    <div className="w-100 text-center mt-2">
        <h1>You voted: </h1>

        <h3>{location.state.answer}, on question:</h3>
        <h3>{location.state.question}</h3>
    </div>  

    <div className="w-100 text-center mt-2">
        <p> Just take me <Link to="/home">Home</Link> </p>
    </div>
    </>
  )
}
