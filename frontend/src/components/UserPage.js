import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import ShowPoll from "./subComponents/ShowPoll"
import HomeButton from "./subComponents/HomeButton"


export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/HomeLoggedIn")
    } catch {
      setError("Failed to log out")
    }
  }
  
  return (
    <>
      <Card>
        <Card.Body className="mx-auto">
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <div className="w-100">
          <strong>Email:</strong> {currentUser.email}
          </div> 

          <div className="d-grid gap-2 ">
          <Link to="/update-profile" className="btn btn-primary">
            Update Profile
          </Link>

          <Button onClick={handleLogout}  className="btn btn-primary">
            Log Out
          </Button>
          </div>
  
        </Card.Body>
      </Card>

      <Card className="text-center mt-4" >
        <Card.Body className="mx-auto">
        
        <ShowPoll mail={currentUser.email} history={history}/>

        </Card.Body>
      </Card>



      <div className="w-100 text-center mt-2">

        <Link className="btn btn-secondary" to="/PollEditor" style={{witdh: 110}}>Poll Editor</Link>
      </div>

      <div className="text-center mt-2"><HomeButton /></div>
      
    </>
  )
}