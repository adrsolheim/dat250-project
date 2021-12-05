import React, { Component } from 'react'
import  PollService  from "../services/PollService"

export default class ResultBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            yes : 0,
            no: 0
        }
    }

    async componentDidMount () {
        const poll = this.props.poll

        
     
        this.setState({yes : poll.yesVote,
                       no : poll.noVote
                    })
        this.doInterValChange()
    }
    doInterValChange() {
            this.myInterval = setInterval(() => {
                PollService.getPollbyId(this.props.poll.id).then(
                (poll) => {
                    this.setState(({
                        yes: poll.yesVote,
                        no: poll.noVote
                    }))
                },
                (error) => {
                   
                }
            )
            }, 1000)

    }
    componentWillUnmount () {
        clearInterval(this.myInterval)
    }


    render() {
        function calcYes(yes, no) {
            if (yes === no) {
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
                <div className="progress">
                    <div className="progress-bar bg-success" style={{width: `${yesPercent}%`}} aria-valuenow={yesPercent} aria-valuemin="0" aria-valuemax="100">Yes: {yesPercent}%</div>
                    <div className="progress-bar bg-danger"  style={{width: `${100- yesPercent}%`}} aria-valuenow={100 - yesPercent} aria-valuemin="0" aria-valuemax="100">No: {100-yesPercent}%</div>            
                </div>

                <br/>

                <h4>Number of votes:</h4>
                <pre>Yes votes: {yesVotes}          No votes: {noVotes}         In Total: {yesVotes + noVotes}</pre>
            </div>

     

        )
    }

}
