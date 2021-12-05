/*
This code is based on a guide from Youtube

Information about guide:
created by user: Web Dev Simplified
uploaded: 10. Oktober 2020
title: React Authentication Crash Course With Firebase And Routing
link to video: https://youtu.be/PKwu15ldZ7k
*/
import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import HomeButton from "./subComponents/HomeButton"


export default function Login() {
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
        history.push("/HomeLoggedIn")
        } catch {
            setError("Failed to log in")
        }

        setLoading(false)
    }

    return (
        <>
        <Card>
            <Card.Body>
                
                <h2 className="text-center">Log In</h2>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>

                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>

                    <br/>
                    <div className="text-center">
                        <Button disabled={loading} className="w-75" type="submit">
                            Log In
                        </Button>
                    </div>
                    
                </Form>

                <div className="w-100 text-center mt-3">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>

            </Card.Body>
        </Card>


      <div className="text-center">
        <p> Don't have an account? <Link to="/signup">Creat account</Link> </p>
    
        <HomeButton />
      </div>
    </>
  )
}
