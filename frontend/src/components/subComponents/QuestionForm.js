import React, { Component } from 'react'
import { Button, Form } from "react-bootstrap"
import  PollService  from "../services/PollService"


class QuestionForm extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      question: "",
      timer: 0,
      public: false,
      test : "",
      user : props.mail
    }
  }

  handleSubmit = event => {
   
    alert(`${this.state.question}
           ${this.state.timer}
           ${this.state.public}`)
    event.preventDefault();

    let poll = {
          question : this.state.question, 
          yesVote : 0,
          noVote : 0,
          isPublic: this.state.public,
          code : 0,// We went over to a code by id system //Math.round(min + Math.random() * (max - min)).toString(),
          duration : this.state.timer,
          email : this.props.mail,
          deviceList : [],
          public : this.state.public
    }
   
    PollService.createPoll(JSON.stringify(poll), this.props.mail)

  }



  changeTest = (ny) => {
    this.setState({
      test: ny.value
    })
    console.log(this.state.test)
  }

  handleQuestionChange = (event) => {
    this.setState({
      question: event.target.value
    })
  }

  handleTimerChange = (event) => {
    var currentDate = new Date().getTime() + event.target.value * 1000
    currentDate = Math.floor(currentDate/1000)
    this.setState({
      timer: currentDate
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
            
            <Form.Group className="mb-4" >
              <Form.Label>Write a question</Form.Label>
              <Form.Control value={this.question} onChange={this.handleQuestionChange} type="text" placeholder="Enter question" />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>How long will poll be open (in seconds)?</Form.Label>
              <Form.Control 
                value={this.timer} 
                onChange={this.handleTimerChange} 
                type="number" 
                placeholder="Time" />
            </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicCheckbox">
            <p> Do you want to make the question public (true) or private (false)? </p>
            <Form.Check
              className="form-check form-switch" 
              value={this.public}  
              onChange={this.handlePubllicChange} 
              type="checkbox" 
              label="Public" 
              style={{ position: 'relative', left: '45%'}}
              />
            <div className="text-center">
              ({(this.state.public).toString()})
            </div>
          </Form.Group>


          <div className="w-100 text-center mt-2">
          <Button variant="primary" type="submit">
            Submit
          </Button>
          </div>
        </Form>
      </div>
      )
    }
}

export default QuestionForm
