import React from "react"
import Timer from "./subComponents/Timer"
import ResultBar from "./subComponents/ResultBar"
import { Link } from "react-router-dom"

export default function Poll(props) {


  return (
    <>
        <h1>
            Poll Analytics
        </h1>
        <p><b>Question</b> {props.location.state.poll.question}</p>

        <p><b>Code</b> {props.location.state.poll.code}</p>

        <ResultBar poll={props.location.state.poll}/>

        <div>
          <Timer end_time={props.location.state.poll.duration}/>
        </div>

        <div className="w-100 text-center mt-2">
          <p> <Link to="/Dashboard">Dashboard</Link> </p>
        </div>
    </>
  )
}

