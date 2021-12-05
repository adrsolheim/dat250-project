import React from "react"

import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import QuestionForm from "./subComponents/QuestionForm"


export default function PollEditor() {
  const { currentUser } = useAuth()
  const mail = currentUser.email



  return (
    
    <>
    <strong>Logged in as:</strong> {currentUser.email}
    
    <br/>
    
    <br/>
    <h3>Create a Poll</h3>
    <br/>
    <QuestionForm mail={mail}/> 

    <br/>
    <br/>

    <div className="w-100 text-center ">

        <Link className="btn btn-info" to="/UserPage">User Page</Link>
   
    </div>
      
    </>
    
  )
}