import React, { useRef, useState, useParams } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory, useLocation } from "react-router-dom"
import  PollService  from "./services/PollService"

export default function Poll() {
   
    const location = useLocation();
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
  

    function voteYes(event) {
        console.log(event.target.value)
        PollService.voteYes(location.state.id)
        voted("Yes", location.state.question)
    }
    function voteNo(event) {
        console.log(event.target.value)
        PollService.voteNo(location.state.id)
        voted("No", location.state.question)
    }
    function voted(vote, question) {
        let votedResult = {
            answer : vote,
            question : question,
        }
        history.push("/voted", votedResult)
    }
  
  return (
    <>
      <h1>Poll Question:</h1>

      <h3>Pin to enter: {location.state.code}</h3>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">{location.state.question}</h2>
        
          <Form >
            <Button value={true} onClick={voteYes} className="w-50 btn-success">
              Yes
            </Button>
            <Button value={false} onClick={voteNo}  className="w-50 btn-danger">
              No
            </Button>
          </Form>
      
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        <p> Just take me Home <Link to="/home">Home</Link> </p>

      
      </div>
    </>
  )
}
