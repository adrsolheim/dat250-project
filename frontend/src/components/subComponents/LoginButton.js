import React, { Component } from 'react'
import { Link } from "react-router-dom"


export default class LogginButton extends Component {
    render() {
        return (
            <div>
                <Link className="btn btn-secondary" style={{width: 150}} to="/login" >
                    Log In
                </Link>
            </div>
        )
    }
}