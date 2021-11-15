import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login.js';
import Home from './components/Home.js';
import Poll from './components/Poll.js';
import PollList from './components/PollList.js';
import NavigationBar from './components/NavigationBar.js';


class App extends Component {
  state = {
    polls: []
  };

  async componentDidMount() {

  }

  render() {
    const {polls} = this.state;
    return (
        <div className="App">
          <NavigationBar />
        </div>
    );
  }
}
export default App;