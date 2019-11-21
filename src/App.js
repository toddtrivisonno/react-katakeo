import React from 'react';
import './App.css';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class PersonList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      array: [],
      users: [],
      register: false
    }
    this.getTokenFromChild = this.getTokenFromChild.bind(this);
    this.setRegister = this.setRegister.bind(this);
    this.setToken = this.setToken.bind(this);
  }

  setToken(token) {
    this.setState({ token: token })
  }
  setRegister() {
    this.setState({ register: !this.state.register })
  }

  getTokenFromChild(token) {
    this.setToken(token);
    this.getLaravelStuff();
  }


  // --- Get and Set API --- //
  async getLaravelStuff() {
    const axios = require('axios');
    const config = {
      headers: { 'Authorization': "Bearer " + this.state.token }
    };

    const userResponse = await axios.get('http://127.0.0.1:8000/api/users', config);

    this.setState({
      users: userResponse.data.data,

    })
    console.log(this.state)

  }

  render() {

    console.log(this.state.register);

    return this.state.register ? (
      <div>
        <h1 className="display-4 text-center pt-4 mt-3" id="title">KATAKEO</h1>
        <Register />
      </div>
    )
      : !this.state.token ? (
        <div>
          <Navbar setRegister={this.setRegister} register={this.state.register} />
          <h1 className="display-4 text-center pt-4 mt-3" id="title">KATAKEO</h1>
          <Login tokenFunction={this.getTokenFromChild} />
        </div>
      )
        : (
          <div className="bg-light">
            <Navbar token={this.state.token}
              tokenFunction={this.setToken} />
          </div>
        );
  }
}
