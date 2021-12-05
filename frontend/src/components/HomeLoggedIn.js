import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import  PollService  from "./services/PollService"



export default function HomeLoggIn() {
   
    const pincode = useRef()
   
    const { currentUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

  
    
    async function handleSubmit(event) {
      event.preventDefault()
      const code = pincode.current.value
      try {
        setError("")
        setLoading(true)
        if (code === null || code === "") {
            throw new Error("You have not given a code")
        }
      
        var poll = await PollService.getPollbyId(code)
         
  
        if (poll === null) {
            throw new Error("Poll not accessible")
        }
        if (poll.duration === 0) {
            throw new Error("This poll has ran out")
        }
        if (new Date() - (new Date(poll.duration)*1000) > 0) {
            PollService.checkForStop(poll)
            throw new Error("This poll has ran out")
        }

    
        var pollid = "/" + poll.id
        history.push("/poll" + pollid, poll)

      } catch {
        setError("This pin code does not exist")
      }
  
      setLoading(false)
    }

 
  
  return (
    <>
        <strong>Logged in as:</strong> {currentUser.email}
    
        <br/>
    
        <br/>
      
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Give me a pin code!</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="pin">
              <Form.Control ref={pincode}  type={"number"} placeholder={"Pin Code"} />
            </Form.Group>

            <br/>

            <div className="text-center">
            <Button disabled={loading} className="w-75 btn-success" type="submit">
              Enter Pin
            </Button>
            </div>

          </Form>
          
        </Card.Body>
      </Card>
      <br></br>
      
      <div className="w-100 text-center mt-2 ">
        <Link className="btn btn-info w-50" to="/UserPage">User page</Link>
      </div>
    </>
  )
}
