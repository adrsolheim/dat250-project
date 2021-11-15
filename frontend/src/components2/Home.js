import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Home() {
   

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
  
    async function handleSubmit(e) {
      e.preventDefault()
  
      try {
        setError("")
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        history.push("/")
      } catch {
        setError("Failed to log in")
      }
  
      setLoading(false)
    }
  
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Give me a pin code!</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="pin">
              <Form.Label>Pin Code</Form.Label>
              <Form.Control />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">
              Enter Pin
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <p> Need an account? <Link to="/signup">Sign Up</Link> </p>

        <p>Take me to my user page: <Link to="/DashBoard">User page</Link> </p>
      </div>
    </>
  )
}
