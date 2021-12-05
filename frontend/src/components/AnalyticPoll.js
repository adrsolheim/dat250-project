import React from "react"
import Timer from "./subComponents/Timer"
import ResultBar from "./subComponents/ResultBar"
import { Link } from "react-router-dom"

export default function AnalyticPoll(props) {


  return (
    <>
        <h1> Poll Analytics </h1>
            
        
        <p><b>Question:</b> {props.location.state.poll.question}</p>

        <p><b>Code:</b> {props.location.state.poll.id}</p>

        <ResultBar poll={props.location.state.poll}/>

        <div>
          <Timer end_time={props.location.state.poll.duration}/>
        </div>

        <div className="w-100 text-center">
          <Link className="btn btn-info" to="/UserPage">User Page</Link>
        </div>
    </>
  )
}

