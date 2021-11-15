import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from './Login.js';
import Home from './Home.js';
import Poll from './Poll.js';
import User from './User.js';
import PollList from './PollList.js';

export default class NavigationBar extends  Component {
    render() {
        return (
        <Router>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">FeedApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                    <Nav.Link as={Link} to={"/polls"}>Polls</Nav.Link>
                    <Nav.Link as={Link} to={"/user"}>Users</Nav.Link>
                    <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/polls" element={<PollList />} />
                  <Route path="/user" element={<User />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
            </div>
            </Router>
        );
    }
}