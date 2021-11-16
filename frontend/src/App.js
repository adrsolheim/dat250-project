import React from "react"
import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { AuthProvider } from "./contexts/AuthContext"
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import PrivateRoute from "./components/PrivateRoute"
import ForgotPassword from "./components/ForgotPassword"
import UpdateProfile from "./components/UpdateProfile"
import PollEditor from "./components/PollEditor"
import Poll from "./components/Poll"
import Home from "./components/Home"
import Voted from "./components/Voted"

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute path="/Dashboard" component={Dashboard} />
              <PrivateRoute path="/PollEditor" component={PollEditor} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/poll/:id" component={Poll} />
              <Route path="/voted" component={Voted} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/home" component={Home} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App