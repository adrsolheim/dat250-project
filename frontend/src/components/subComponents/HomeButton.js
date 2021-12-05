import React, { Component } from 'react'
import { Link } from "react-router-dom"


export default class HomeButton extends Component {
    render() {
        return (
            <div>
                <Link className="btn btn-info" style={{width: 100}} to="/HomeLoggedIn" >
                    Home
                </Link>
            </div>
        )
    }
}
