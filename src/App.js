import React from 'react';
import './App.css';
import Login from './Components/Login';
// import Navbar from './Components/Navbar';
// import Register from './Components/Register';
import Game from './Components/Game';
import ChallengeMenu from './Components/ChallengeMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Axios from 'axios';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      array: [],
      users: [],
      register: false,
      data: {},
      play: false,
      modal: false,
      selectedChallenge: '',
      challengeName: ''
    }
    this.getTokenFromChild = this.getTokenFromChild.bind(this);
    this.setRegister = this.setRegister.bind(this);
    this.dataStore = this.dataStore.bind(this);
    this.playSelected = this.playSelected.bind(this);
    this.setModal = this.setModal.bind(this);
    this.getSelectedChallenge = this.getSelectedChallenge.bind(this);
  }

  setModal() {
    this.setState({ modal: !this.state.modal })
  }

  playSelected() {
    this.setState({ play: !this.state.play })
  }

  dataStore(data) {
    this.setState({ data: data })
  }

  setRegister() {
    this.setState({ register: !this.state.register })
  }

  getTokenFromChild(token) {
    this.dataStore(token)
    this.setState({ 'token': token });
  }

  getSelectedChallenge(challenge) {
    const target = challenge.target;
    const challengeId = target.id;
    const name = target.name;
    console.log(name);
    this.setState({
       selectedChallenge: challengeId,
       challengeName: [name]
    })
  }

  componentDidMount() {
    if (!localStorage.getItem('fullContent')) {
      Axios.get('http://127.0.0.1:8000/api/getFullContent')
        .then(res => {
          localStorage.setItem('fullContent', JSON.stringify(res.data.fullContent));
        })
    }
    this.setState({ fullContent: JSON.parse(localStorage.getItem('fullContent')) });
  }


  render() {
    console.log(this.state)
    // if(this.state.challengeName !== '') {
    //   var b = this.state.fullContent[this.state.challengeName];
    //   console.log(b[0].id);
    // }
    //console.log(this.state);
    
    // console.log(this.state.register);
    // console.log(this.state.play);
    // console.log(this.state.modal);
    return (
      <>
        <div>
          {/* <Navbar
            setRegister={this.setRegister}
            register={this.state.register}
            dataStore={this.dataStore}
            token={this.state.token}

          /> */}




          {this.state.play ? (
            this.state.fullContent ?
              <>
                <ChallengeMenu fullContent={this.state.fullContent} getSelectedChallenge={this.getSelectedChallenge} />
                <Game selectedChallenge={this.state.selectedChallenge} fullContent={this.state.fullContent} />
              </>
              : null
          ) : (
              <>
                <h1 className="display-4 text-center pt-4 mt-5" id="title">KATAKEO</h1>
                <div className="container">
                  <div className="row vh-100">
                    <div className="col my-auto">
                      <button type="button" onClick={this.setModal} className="btn btn-info btn-lg d-block m-5 mx-auto">Log In - Sign Up</button>

                      <Login visibility={this.state.modal} changeModal={this.setModal} />

                      <button type="button" onClick={this.playSelected} className="btn btn-info btn-lg d-block m-5 mx-auto">Continue as Guest</button>
                    </div>
                  </div>
                </div>
              </>
            )
          }

          {/* {this.state.register ? (
            <Register tokenFunction={this.getTokenFromChild} changeRegister={this.setRegister} dataStore={this.dataStore} />
          ) : !this.state.data.token ? (
            <Login dataStore={this.dataStore} tokenFunction={this.getTokenFromChild} />
          ) : (<ChallengeMenu data={this.state.data} />)} */}
        </div>


      </>
    )
  }
}
