import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = { users: [] };
  componentDidMount() {
    axios
      .get('/api/v1/users')
      .then(response => {
        const users = response.data;
        this.setState(() => ({ users: users.data }));
      })
      .catch(function(response) {
        console.log(response);
      });
  }
  render() {
    return (
      <div>
        <h3>Users</h3>
        <ul>{this.state.users.map(user => <li key={user.id}>{user.firstname}</li>)}</ul>
      </div>
    );
  }
}

export default App;
