
import React, { useEffect, useState, Component } from 'react';

class PollList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            polls: []
        };
    }

    async componentDidMount() {
        const response = await fetch('/api/polls');
        const body = await response.json();
        this.setState({polls: body});
      }

    render() {
        const {polls} = this.state;
        return (
            <div>
              <h2>Polls</h2>
              {polls.map(poll =>
                <div key={poll.id}>
                  {poll.question}
                </div>
                )}
            </div>
        );
    }
}
/*
function PollList(props) {
    const [polls] = useState([]);
    useEffect(() => {
    async function fetchMyAPI() {
          const response = await fetch('/api/polls');
          const body = await response.json();
          polls = body;
        }
    fetchMyAPI()
    }, []);
    return (
            <div>
                  <h2>Polls</h2>
                  { polls.map(poll =>
                      <div key={poll.id}>
                        {poll.question}
                      </div>
                  )}
            </div>
        );
}
*/
export default PollList;