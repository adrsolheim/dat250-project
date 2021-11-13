import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  state = {
    polls: []
  };

  async componentDidMount() {
    const response = await fetch('/api/polls');
    const body = await response.json();
    this.setState({polls: body});
  }

  render() {
    const {polls} = this.state;
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="App-intro">
              <h2>Polls</h2>
              {polls.map(poll =>
                  <div key={poll.id}>
                    {poll.question}
                  </div>
              )}
            </div>
          </header>
        </div>
    );
  }
}
export default App;