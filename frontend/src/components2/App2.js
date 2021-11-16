import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import PollEditor from "./PollEditor"
import Poll from "./Poll"
import Home from "./Home"
import Voted from "./Voted"

function App2() {
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

export default App2