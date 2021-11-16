import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import HomePollForm from "./subComponents/HomePollForm"
import  PollService  from "./services/PollService"


export default function Home() {
   
    const [pincode, setcode] = useState()
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

  
    function pickPoll(pincode, polls) {
      for (let i = 0; i < polls.data.length; i++) {
          if (pincode == polls.data[i].code) {
              return polls.data[i]
          }
      }
      return null
    }


    async function handleSubmit(event) {
      event.preventDefault()
      console.log(pincode)
      try {
        setError("")
        setLoading(true)

        //await getPoll(pincode.current.value)
        var polls = await PollService.getPolls()
        var poll = await pickPoll(pincode, polls)
        if (poll == null) {
          throw new Error
        }
        console.log(poll)
        var pollid = "/" + poll.id
        history.push("/poll" + pollid, poll)
      } catch {
        setError("This pin code does not exist")
      }
  
      setLoading(false)
    }

 
    const changeCode = (event) => {
      setcode(event.target.value);
    };



  
  return (
    <>
     
      
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Give me a pin code!</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="pin">
              <Form.Control value={pincode} onChange={changeCode} type={"number"} placeholder={"Pin Code"} />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">
              Enter Pin
            </Button>

          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <p> Need an account? <Link to="/signup">Sign Up</Link> </p>

        <p>Take me to my user page: <Link to="/DashBoard">User page</Link> </p>
      </div>
    </>
  )
}
