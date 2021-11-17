import React, { Component } from 'react'
import  PollService  from "../services/PollService"

class ShowPoll extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            polls : [],
            email : props.mail

        }
    }




    componentDidMount() {
        //PollService.getPollsForUser(this.state.email).then((res) => {
        PollService.getPollsForUser(this.state.email).then((res) => {
            console.log(res)
            this.setState({ polls: res})
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">List of polls</h2>
                <div className = "row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Yes Votes</th>
                                <th>No Votes</th>
                                <th>Code</th>
                            </tr>
                        </thead>
                        
                        <tbody>

                            {   
                                
                                this.state.polls.map(
                                    poll =>
                                    <tr key = {poll.id}>
                                        <td> {poll.question} </td>
                                        <td> {poll.yesVote} </td>
                                        <td> {poll.noVote} </td>
                                        <td> {poll.code} </td>

                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


export default ShowPoll