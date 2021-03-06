import React from "react"
import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { AuthProvider } from "./contexts/AuthContext"
import Signup from "./components/Signup"
import UserPage from "./components/UserPage"
import Login from "./components/Login"
import PrivateRoute from "./components/PrivateRoute"
import ForgotPassword from "./components/ForgotPassword"
import UpdateProfile from "./components/UpdateProfile"
import PollEditor from "./components/PollEditor"
import Poll from "./components/Poll"
import Home from "./components/Home"
import HomeLoggedIn from "./components/HomeLoggedIn"
import Voted from "./components/Voted"
import AnalyticPoll from "./components/AnalyticPoll"

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "50vh" }}
    >
      <div className="w-100" style={{ maxWidth: "500px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute path="/UserPage" component={UserPage} />
              <PrivateRoute path="/PollEditor" component={PollEditor} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/HomeLoggedIn" component={HomeLoggedIn} />
              <Route path="/poll/:id" component={Poll} />
              <Route path="/voted" component={Voted} />
              <Route path="/signup" component={Signup} />
              <Route path="/analyticPoll" component={AnalyticPoll} />
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