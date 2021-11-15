import React, { useState } from "react"
import { Card, Button, Alert, Form } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import QuestonForm from "./subComponents/QuestionForm"


export default function PollEditor() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()




  return (
    <>
    <QuestonForm />

    <div class="pull-right">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
      <p> <Link to="/Dashboard">Dashboard</Link> </p>
      </div>
    </div>
      
    </>
    
  )
}