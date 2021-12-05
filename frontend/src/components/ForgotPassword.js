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
import { Link } from "react-router-dom"
import HomeButton from "./subComponents/HomeButton"

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")
        } catch {
            setError("Failed to reset password")
        }

        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                <h2 className="text-center mb-4">Password Reset</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}

                <Form onSubmit={handleSubmit}>
                    
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>

                    <br/>

                    <div className="text-center">
                        <Button disabled={loading} className="w-75" type="submit">
                            Reset Password
                        </Button>
                    </div>
                </Form>


                <div className="w-100 text-center mt-3">
                    <Link to="/login">Login</Link>
                </div>

                </Card.Body>

            </Card>

            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>

            <br/>

            <div className="text-center">
                <HomeButton />
            </div>
        </>
    )
}