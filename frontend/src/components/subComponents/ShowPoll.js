import React, { Component } from 'react'
import  PollService  from "../services/PollService"

class ShowPoll extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            polls : [],
            stoppedPolls : [],
            email : props.mail

        }
    }

    async stopPoll(id) {
        const res = PollService.getStopp(id)
        window.location.reload();
    }


    componentDidMount() {
        //PollService.getPollsForUser(this.state.email).then((res) => {
        PollService.getPollsForUser(this.state.email).then((res) => {
            console.log(res)
            this.setState({ polls: res})
        });
        PollService.getStoppedPollsForUser(this.state.email).then((res) => {
            console.log(res)
            this.setState({ stoppedPolls: res})
        });
    }

    render() {
        return (
            <div  >
                <div className = "dt-body-center">
                    <h2>All ongoing polls for this user</h2>

                    <table className="table table-striped table-bordered table-center" style={{ width : "100%"}}>
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
                                            <button onClick={() => this.stopPoll(poll.id)} className="btn btn-danger">Stop Poll</button> 
                                        </td>

                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>

                <div className = "dt-body-center">

                    <h2>All stopped polls for this user</h2>

                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Yes Votes</th>
                                <th>No Votes</th>
                            </tr>
                        </thead>
                        
                        <tbody>

                            {   
                                
                                this.state.stoppedPolls.map(
                                    poll =>
                                    <tr key = {poll.id}>
                                        <td> {poll.question} </td>
                                        <td> {poll.yesVote} </td>
                                        <td> {poll.noVote} </td>
                                        
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