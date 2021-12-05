import React from "react"
import { Form, Button, Card } from "react-bootstrap"
import { Link, useHistory, useLocation } from "react-router-dom"
import  PollService  from "./services/PollService"
import Timer from "./subComponents/Timer"

export default function Poll() {
   
    const location = useLocation();
    const history = useHistory()
  

    function voteYes(event) {
      if (checkDuration()) {
        PollService.voteYes(location.state.id)
        voted("Yes", location.state.question)
      } else {
        history.push("/HomeLoggedIn")
      }
    }
    function voteNo(event) {
      if (checkDuration()) {
        PollService.voteNo(location.state.id)
        voted("No", location.state.question)
      } else {
        history.push("/HomeLoggedIn")
      }
    }
    function voted(vote, question) {
        let votedResult = {
            answer : vote,
            poll : location.state,
        }
        history.push("/voted", votedResult)
    }

    function checkDuration() {
      if (new Date() - (new Date(location.state.duration)*1000) > 0) {
        PollService.checkForStop(location.state)
        return false
      }
      return true
    }
  
  return (
    <>
      <h1>Poll Question:</h1>
      <br/>
      <h4>Code to join: {location.state.id}</h4>
      <div>
          <Timer end_time={location.state.duration}/>
      </div>
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
        <p> Just take me Home <Link to="/HomeLoggedIn">Home</Link> </p>

      
      </div>
    </>
  )
}
