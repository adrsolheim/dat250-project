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

    stopPoll(id, question) {

        let message = {
            question : question,
        }

        this.props.history.push('/api/polls/finish/'+id, message)
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
                <div className = "row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Yes Votes</th>
                                <th>No Votes</th>
                                <th>Code</th>
                                <th>Stop Poll</th>
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
                                        <td>
                                            <button onClick={() => this.stopPoll(poll.id, poll.question)} className="btn btn-danger">Stop Poll</button> 
                                        </td>

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