import React, { Component } from 'react'
import { Card, Button, Alert, Form } from "react-bootstrap"
import  PollService  from "../services/PollService"

class QuestionForm extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      question: "",
      timer: 0,
      public: true
    }
  }

  handleSubmit = event => {
    // TODO - get this into REST
    alert(`${this.state.question}
           ${this.state.timer}
           ${this.state.public}`)
    event.preventDefault();

    var min = 10000
    var max = 1000000

    let poll = {
          question : this.state.question, 
          yesVote : 0,
          noVote : 0,
          isPublic: this.state.public,
          code : Math.round(min + Math.random() * (max - min)).toString(),
          duration : this.state.timer,
          userAccount : null,
          deviceList : [],
          public : this.state.public
    }
    console.log("poll => " + JSON.stringify(poll))
    PollService.createPoll(poll)
  }

  handleQuestionChange = (event) => {
    this.setState({
      question: event.target.value
    })
  }
  handleTimerChange = (event) => {
    this.setState({
      timer: event.target.value
    })
  }
  handlePubllicChange = (event) => {
    this.setState({
      
      public: !(this.state.public),
     
    })
  }



    render() {
      return (
        <div>
          <Form onSubmit={this.handleSubmit}>

            <Form.Group className="mb-3" >
              <Form.Label>Write a question</Form.Label>
              <Form.Control value={this.question} onChange={this.handleQuestionChange} type="text" placeholder="Enter question" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>How long will poll be open (in seconds)?</Form.Label>
              <Form.Control value={this.timer} onChange={this.handleTimerChange} type="number" placeholder="Time" />
            </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check value={this.public}  onChange={this.handlePubllicChange} type="checkbox" label="Public" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>

        </Form>
      </div>
      )
    }
}

export default QuestionForm