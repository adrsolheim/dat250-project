import React, { Component } from 'react'
import { progress, Button, Card, Alert, PlaceholderButton } from "react-bootstrap"
import  PollService  from "../services/PollService"

export default class ResultBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            yes : 0,
            no: 0
        }
    }


    render() {
        function calcYes(yes, no) {
            if (yes == no) {
                return 50
            } else {
                return Math.round(yes/(yes+no)*100)
            }
        }


        const yesVotes = this.state.yes
        const noVotes = this.state.no
        const yesPercent = calcYes(yesVotes, noVotes)
        return (
            <div>
                <h3>Results:</h3>
                <div class="progress">
                    <div class="progress-bar bg-success" role="progress" style={{width: `${yesPercent}%`}} aria-valuenow={yesPercent} aria-valuemin="0" aria-valuemax="100">Yes: {yesPercent}%</div>
                    <div class="progress-bar bg-danger" role="progress" style={{width: `${100- yesPercent}%`}} aria-valuenow={100 - yesPercent} aria-valuemin="0" aria-valuemax="100">No: {100-yesPercent}%</div>            
                </div>

                <br/>

                <h4>Number of votes:</h4>
                <p> <pre>Yes votes: {yesVotes}          No votes: {noVotes}         In Total: {yesVotes + noVotes}</pre></p>
            </div>

     

        )
    }

    async componentDidMount () {
        const poll = this.props.poll

        
        console.log(poll)
        this.setState({yes : poll.yesVote,
                       no : poll.noVote
                    })
        this.doInterValChange()
    }
    doInterValChange() {
            this.myInterval = setInterval(() => {
                PollService.getPollbyId2(this.props.poll.id).then(
                (poll) => {
                    this.setState(({
                        yes: poll.yesVote,
                        no: poll.noVote
                    }))
                },
                (error) => {
                   console.log("Got an error:" + error);
                }
            )
            }, 1000)

    }
    componentWillUnmount () {
        clearInterval(this.myInterval)
    }


}
