
import React from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Modal extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         name: '',
         email: '',
         password: '',
         register: false
      }
      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.Login = this.Login.bind(this);
      this.Register = this.Register.bind(this);
   }

   handleClick() {
      this.setState({
         register: !this.state.register
      });
   }

   handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
         [name]: value
      });
   }

   handleSubmit(event) {
      event.preventDefault();
      if (this.state.register) {
         const credentials = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
         }
         this.Register(credentials)
      }
      else {
         const credentials = {
            email: this.state.email,
            password: this.state.password,
         }
         this.Login(credentials)
      }
      this.props.changeModal();
      this.props.playGame();

   }

   Login(credentials) {
      Axios.post('https://katakeo.appspot.com/api/login', credentials)
         .then(res => {
            localStorage.setItem('data', JSON.stringify(res.data));
            this.props.dataStore(res.data);
         })
   }

   Register(credentials) {
      Axios.post('https://katakeo.appspot.com/api/register', credentials)
         .then(res => {
            localStorage.setItem('data', JSON.stringify(res.data));
            this.props.dataStore(res.data);
         })
   }

   render() {
      return (
         <div
            className={this.props.visibility ? 'modal fade show' : 'modal'}
            style={this.props.visibility ? ({ display: "block" }) : ({ display: "none" })} tabIndex="-1" role="dialog"
         >
            <div className="modal-dialog modal-dialog-centered" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h3 className="modal-title">
                        {this.state.register ? "Register" : "Sign In"}
                     </h3>
                     <button type="button" onClick={this.props.changeModal} className="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <form className="form-signin" onSubmit={this.handleSubmit}>
                        {this.state.register ? (
                           <div className="pb-3 d-flex">
                              <FontAwesomeIcon
                                 icon="user" className="m-2" size="lg" color="gray"
                              />
                              <label htmlFor="inputName" className="sr-only">Your Name</label>
                              <input
                                 type="name"
                                 id="inputName"
                                 className="form-control"
                                 placeholder="Your Name"
                                 name="name"
                                 value={this.state.name}
                                 onChange={this.handleChange}
                              />
                           </div>
                        ) : null}
                        <div className="pb-3 d-flex">
                           <FontAwesomeIcon
                              icon="envelope" className="m-2" size="lg" color="gray"
                           />
                           <label htmlFor="inputEmail" className="sr-only">Your Email</label>
                           <input
                              type="email"
                              id="inputEmail"
                              className="form-control"
                              placeholder="Your Email"
                              name="email"
                              value={this.state.email}
                              onChange={this.handleChange} />
                        </div>
                        <div className="pb-3 d-flex">
                           <FontAwesomeIcon
                              icon="lock" className="m-2" size="lg" color="gray"
                           />
                           <label htmlFor="inputPassword" className="sr-only">Password</label>
                           <input
                              type="password"
                              id="inputPassword"
                              className="form-control"
                              placeholder="Password"
                              name="password"
                              value={this.state.password}
                              onChange={this.handleChange} />
                        </div>
                        <button
                           className="btn btn-lg btn-block btn-info"
                           name="submit"
                           type="submit"
                           onSubmit={this.handleSubmit}
                        >
                           {this.state.register ? "Register" : "Sign In"}
                        </button>
                     </form>
                  </div>
                  <div className="modal-footer">
                     <button
                        type="button"
                        className="btn btn-outline-info"
                        onClick={this.handleClick}
                     >

                        {!this.state.register ? "Register" : "Sign In"}
                     </button>
                     <button
                        type="button"
                        onClick={this.props.changeModal}
                        className="btn btn-secondary"
                        data-dismiss="modal"
                     >
                        Close
                     </button>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default Modal;
