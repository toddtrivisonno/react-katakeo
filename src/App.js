import React from 'react';
import './App.css';
import Modal from './Components/Modal';
import WinModal from './Components/WinModal';
import Navbar from './Components/Navbar';
// import Register from './Components/Register';
import Game from './Components/Game';
import ChallengeMenu from './Components/ChallengeMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faLock, faEnvelope, faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faLock, faEnvelope, faUser, faArrowLeft)


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
      fail: false,
      modal: false,
      winModal: false,
      selectedChallenge: '',
      challengeName: ''
    }
    this.getTokenFromChild = this.getTokenFromChild.bind(this);
    this.setRegister = this.setRegister.bind(this);
    this.dataStore = this.dataStore.bind(this);
    this.playSelected = this.playSelected.bind(this);
    this.setModal = this.setModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.checkFail = this.checkFail.bind(this);
    this.getSelectedChallenge = this.getSelectedChallenge.bind(this);
    this.nullSelectedChallenge = this.nullSelectedChallenge.bind(this);
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

  getSelectedChallenge(event) {
    this.setState({
      categoryName: event.target.name,
      selectedChallenge: event.target.id

    })
  }

  nullSelectedChallenge(event) {
    this.setState({
      categoryName: '',
      selectedChallenge: ''
    })
  }

  showModal(modalStatus) {
    this.setState({ winModal: modalStatus })
  }
  
  checkFail(failStatus) {
    this.setState({ fail: failStatus })
    // this.setState({ winModal: !this.state.winModal })
  }

  componentDidMount() {
    if (!localStorage.getItem('fullContent')) {
      Axios.get('http://127.0.0.1:8000/api/getFullContent')
        .then(res => {
          localStorage.setItem('fullContent', JSON.stringify(res.data.fullContent));
          this.setState({ fullContent: res.data.fullContent });
        })
    }
    else {
      this.setState({ fullContent: JSON.parse(localStorage.getItem('fullContent')) });
    }

  }

  render() {
    console.log('app.js: ',this.state.fail)
    console.log('app.js: ',this.state.winModal)
    return (
      <div>

        {this.state.play ? (
          this.state.fullContent ?
            <>
              <Navbar
                setRegister={this.setRegister}
                register={this.state.register}
                dataStore={this.dataStore}
                data={this.state.data}
                fullContent={this.state.fullContent}
                setModal={this.setModal}
                returnHome={this.playSelected}
              />
              <h1 className="text-center text-white m-0 bg-secondary challenge-menu">Select a Challenge</h1>
              <ChallengeMenu
                data={this.state.data}
                fullContent={this.state.fullContent}
                getSelectedChallenge={this.getSelectedChallenge}
              />
              <Game
                categoryName={this.state.categoryName}
                selectedChallenge={this.state.selectedChallenge}
                fullContent={this.state.fullContent}
                showModal={this.showModal}
                checkFail={this.checkFail}
                nullSelectedChallenge={this.nullSelectedChallenge}
              />
              <WinModal
                checkWin={this.state.winModal}
                resetModal={this.showModal}
                failState={this.state.fail}
                checkFail={this.checkFail}
                nullSelectedChallenge={this.nullSelectedChallenge}
              />

            </>
            : null
        ) : (
            <>
              <h1
                className="display-4 text-center pt-4 mt-5"
                id="title"
              >
                KATAKEO
              </h1>
              <h6 className="text-center mb-4 pb-5">A simple way to teach the household.</h6>
              <div className="container">
                <div className="row vh-100 pt-5">
                  <div className="col my-auto p-0">
                    {this.state.modal ?
                      <Modal
                        visibility={this.state.modal}
                        changeModal={this.setModal}
                        dataStore={this.dataStore}
                        playGame={this.playSelected}
                      />
                      :
                      <>
                        <button
                          type="button"
                          id="title-button-top"
                          onClick={this.setModal}
                          className="btn btn-info btn-lg btn-block d-block m-3 p-2 mx-auto rounded-0 font-weight-bold"
                        >
                          Sign In - Register
                        </button>
                        <button
                          type="button"
                          id="title-button-bottom"
                          onClick={this.playSelected}
                          className="btn btn-info btn-lg btn-block d-block p-2 mx-auto rounded-0 font-weight-bold"
                        >
                          Continue as Guest
                        </button>
                      </>
                    }
                  </div>
                </div>
              </div>
            </>
          )
        }
      </div>
    )
  }
}
