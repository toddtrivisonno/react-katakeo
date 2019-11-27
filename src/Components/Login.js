
import React from 'react';
import './Login.css';
import Axios from 'axios';

class Login extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         email: '',
         password: '',
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
      Axios.post('http://127.0.0.1:8000/api/login', this.state)
         .then(res => {
            this.setState({ token: res.data.token });
            localStorage.setItem('token', res.data.token);

            this.props.tokenFunction(res.data.token);

            this.setState({ data: res.data });
            console.log(res.data);
            localStorage.setItem('data', JSON.stringify(res.data));
            this.props.dataStore(res.data);
         })
   }

   render() {

      return (
         <>


            {/* <h1 className="display-4 text-center pt-4 mt-3" id="title">KATAKEO</h1> */}


            <div className={this.props.visibility ? 'modal fade show' : 'modal'} style={this.props.visibility ? ({ display: "block" }) : ({ display: "none" })} tabIndex="-1" role="dialog">
               <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h3 className="modal-title">Log In</h3>
                        <button type="button" onClick={this.props.changeModal} className="close" data-dismiss="modal">
                           <span aria-hidden="true">&times;</span>
                        </button>
                     </div>
                     <div className="modal-body">

                        {/* <h1 className="pb-4 text-center">Log In</h1> */}
                        <form className="form-signin" onSubmit={this.handleSubmit}>
                           <div className="pb-3">
                              <label htmlFor="inputEmail" className="sr-only">Your Email</label>
                              <input type="email" id="inputEmail" className="form-control" placeholder="Your Email" name="email" value={this.state.email} onChange={this.handleChange} />
                           </div>
                           <div className="pb-3">
                              <label htmlFor="inputPassword" className="sr-only">Password</label>
                              <input type="password" id="inputPassword" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} ></input>
                           </div>
                           <button className="btn btn-lg btn-block btn-info" name="submit" type="submit" onSubmit={this.handleSubmit} >Log In</button>
                        </form>

                     </div>
                     <div className="modal-footer">
                        <button type="button" className="btn btn-outline-info">Register</button>
                        <button type="button" onClick={this.props.changeModal} className="btn btn-secondary" data-dismiss="modal">Close</button>
                     </div>
                  </div>
               </div>
            </div>

            {/* <div className="p-4" id="hero-text">
               <h1 className="pb-4 text-center">Log In</h1>
               <form className="form-signin" onSubmit={this.handleSubmit}>
                  <div className="pb-3">
                     <label htmlFor="inputEmail" className="sr-only">Your Email</label>
                     <input type="email" id="inputEmail" className="form-control" placeholder="Your Email" name="email" value={this.state.email} onChange={this.handleChange} />
                  </div>
                  <div className="pb-3">
                     <label htmlFor="inputPassword" className="sr-only">Password</label>
                     <input type="password" id="inputPassword" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} ></input>
                  </div>
               </form>
            </div> */}
         </>
      )
   }
}

export default Login;