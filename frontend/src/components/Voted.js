import React from "react"
import Timer from "./subComponents/Timer"
import ResultBar from "./subComponents/ResultBar"
import { Link, useLocation } from "react-router-dom"


export default function Voted() {
   
    const location = useLocation();

  return (
    <>
    <div className="mt-4">
        <h1>You voted: </h1>

        <h4>{location.state.answer}</h4>
    </div>  
    <p><b>Question:</b> {location.state.poll.question}</p>

    <p><b>Code:</b> {location.state.poll.id}</p>

    <ResultBar poll={location.state.poll}/>

    <div>
      <Timer end_time={location.state.poll.duration}/>
    </div>


    <div className="w-100 text-center mt-2">
        <p> Just take me <Link to="/HomeLoggedIn">Home</Link> </p>
    </div>
    </>
  )
}
