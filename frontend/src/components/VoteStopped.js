import React, { useRef, useState, useParams } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory, useLocation } from "react-router-dom"


export default function VoteStopped() {
   
    const location = useLocation();

  return (
    <>
    <div className="w-100 text-center mt-2">
        <h1>Voting for poll:</h1>

        <h3>{location.state.question}, has been stopped</h3>
  
    </div>  

    <div className="w-100 text-center mt-2">
        <p> <Link to="/Dashboard">Go back</Link> </p>
    </div>
    </>
  )
}
