import React, { Component } from 'react'
import  PollService  from "../services/PollService"
import { Link } from "react-router-dom"

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
        await PollService.getStopp(id)
        this.handleUpdateState()       
    }
    componentDidMount() {
        this.handleUpdateState();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.stoppedPolls !== this.state.stoppedPolls &&
            prevState.polls  !== this.state.polls) {
            this.handleUpdateState();
        }
    }
    handleUpdateState = () => {
        PollService.getRunningPolls(this.state.email).then((res) => {
            this.setState({ polls: res})
        });
        PollService.getStoppedPolls(this.state.email).then((res) => {
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
                                <th>View Poll</th>
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
                                        <td>
                                            <Link className="btn btn-primary" 
                                                  to={{
                                                    pathname: "/AnalyticPoll",
                                                    state: {poll}
                                                  }}>
                                                    View Poll
                                            </Link>
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
                                <th>View Poll</th>
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
                                        <td>
                                            <Link className="btn btn-primary" 
                                                  to={{
                                                    pathname: "/AnalyticPoll",
                                                    state: {poll}
                                                  }}>
                                                    View Poll
                                            </Link>
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