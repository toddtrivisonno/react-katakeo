import React from 'react';
import './App.css';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import ChallengeMenu from './Components/ChallengeMenu';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class PersonList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      array: [],
      users: [],
      register: false,
      data: {}
    }
    this.getTokenFromChild = this.getTokenFromChild.bind(this);
    this.setRegister = this.setRegister.bind(this);
    // this.setToken = this.setToken.bind(this);
    this.dataStore = this.dataStore.bind(this);
  }

  dataStore(data) {
    this.setState({ data: data })
  }

  setRegister() {
    this.setState({ register: !this.state.register })
  }

  getTokenFromChild(token) {
    this.dataStore(token)
    this.setState({'token': token});
  }

  render() {
    console.log(this.state);

    return (
      <div>
        <Navbar
          setRegister={this.setRegister}
          register={this.state.register}
          dataStore={this.dataStore}
          token={this.state.token}
          // tokenFunction={this.dataStore}

        />
        {this.state.register ? (
          <Register tokenFunction={this.getTokenFromChild} changeRegister={this.setRegister} dataStore={this.dataStore} />
        ) : !this.state.data.token ? (
          <Login dataStore={this.dataStore} tokenFunction={this.getTokenFromChild} />
        ) : (<ChallengeMenu data={this.state.data} />)}
      </div>
    )
  }
}
