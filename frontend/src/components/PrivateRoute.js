/*
This code is based on a guide from Youtube

Information about guide:
created by user: Web Dev Simplified
uploaded: 10. Oktober 2020
title: React Authentication Crash Course With Firebase And Routing
link to video: https://youtu.be/PKwu15ldZ7k
*/
import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/Home" />
      }}
    ></Route>
  )
}