import React from 'react';
import './App.css';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class PersonList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      array: [],
      users:[],
    }
    this.getTokenFromChild = this.getTokenFromChild.bind(this);
  }
  
  getTokenFromChild(token) {
    this.setState({ token: token })
    this.getLaravelStuff();

  }

  // --- Get and Set API --- //
  async getLaravelStuff() {
    const axios = require('axios');
    const config = {
      headers: {'Authorization': "Bearer " + this.state.token}
    };

    const userResponse = await axios.get('http://127.0.0.1:8000/api/users', config);

    this.setState({
      users: userResponse.data.data,

    })
    console.log(this.state)

  }

  render() {
    if (this.state.token === '') {
      return (
        <div>
          <Navbar />
          <h1 className="display-4 text-center pt-4 mt-3" id="title">KATAKEO</h1>
          <Login tokenFunction={this.getTokenFromChild}/>
        </div>
      )
    } else {
     
      return (
        <div className="bg-light">
         <h1>Gotzzz that token</h1>
        </div>
      )
    }
  }
}

