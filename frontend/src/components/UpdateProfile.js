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

export default function UpdateProfile() {
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const { currentUser, updatePassword } = useAuth()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const history = useHistory()

  	function handleSubmit(event) {
    	event.preventDefault()

    	if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      		return setError("Passwords do not match")
    	}

    const promises = []
    setLoading(true)
    setError("")

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      	.then(() => {
        	history.push("/")
      	})

      	.catch(() => {
        	setError("Failed to update account")
      	})
      	.finally(() => {
        	setLoading(false)
      	})
  	}

  	return (
    	<>
      	<Card>
        	<Card.Body>

          		<h3 className="text-center"> Change Password</h3>
          		

				<br/>

				<p>E-mail: {currentUser.email}</p>

				<br/>

				
          		<Form onSubmit={handleSubmit}>
				  	{error && <Alert variant="danger">{error}</Alert>}
						
					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							ref={passwordRef}
							placeholder="Type a new password"
						/>

					</Form.Group>
						<Form.Group id="password-confirm">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							ref={passwordConfirmRef}
							placeholder="Retype your new password"
						/>
					</Form.Group>
					
					<br/>
					<div className="text-center">
						<Button disabled={loading} className="w-50" type="submit">
							Change Password
						</Button>
					</div>

          		</Form>

        	</Card.Body>
      	</Card>

		<div className="w-100 text-center">
			<Link to="/UserPage">Cancel</Link>
		</div>
    </>
  )
}