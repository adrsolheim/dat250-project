import React, { useEffect, useState, Component } from 'react';

class User extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: []
        };
    }

    async componentDidMount() {
        const response = await fetch('/api/users');
        const body = await response.json();
        this.setState({users: body});
      }

    render() {
        const {users} = this.state;
        return (
            <div>
              <h2>Users</h2>
              {users.map(user =>
                <div key={user.id}>
                  {user.username}
                </div>
                )}
            </div>
        );
    }
}

export default User;