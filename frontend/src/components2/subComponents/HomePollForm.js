import React, { Component, useState } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import  PollService  from "../services/PollService"

class HomePollForm extends Component {

    

    constructor(props) {
        super(props)
        
        this.state = {
          pincode: "",
          polls: [],
          poll: []
        }
      }

    handlePincodeChange = (event) => {
        this.setState({
            pincode: event.target.value
        })
    }


    handleSubmit = event => {
        event.preventDefault()
        this.componentDidMount()
        for (let i = 0; i < this.state.polls.length; i++) {
            console.log(this.state.polls[i].code == this.state.pincode)
            if (this.state.pincode == this.state.polls[i].code) {
                console.log(this.state.polls[i])
                
                this.props.parentCallback(this.state.polls[i]);
                //return this.props.push({pathname : "/poll", state : this.setState({poll : this.state.polls[i]})})

                break;   
            }
        }
        console.log(this.state.poll)
    }
    
    componentDidMount() {
        PollService.getPolls().then((res) => {
            this.setState({polls: res.data})
        })
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Give me a pin code!</h2>
                    <Form onSubmit={this.handleSubmit}>

                        <Form.Group id="pin">
                            <Form.Control  value={this.pincode}  onChange={this.handlePincodeChange} type={"number"} placeholder={"Pin Code"} />
                        </Form.Group>

                        <Button className="w-100" type="submit">
                            Enter Pin
                        </Button>

                    </Form>

                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Login</Link>
                    </div>

                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default HomePollForm
