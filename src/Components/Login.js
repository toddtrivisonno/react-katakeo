
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
      
      // console.log(this.state);
      this.setState({
         [name]: value
      });
   }

   handleSubmit(event) {
      // console.log(this.state);
      event.preventDefault();
      Axios.post('http://127.0.0.1:8000/api/login', this.state)
         .then(res => {
           this.setState({token: res.data.token});
           localStorage.setItem('token', res.data.token);
            // console.log(this.state);
            this.props.tokenFunction(this.state.token);
         })
   }

   render() {
      return (

            <React.Fragment>
               {/* <img src={"./cyclist-landscape.jpg"} id="hero-image" alt="deal with it" /> */}
               <div className="p-4" id="hero-text">
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
                     {/* <div className="checkbox mb-3">
                        <label>
                           <input type="checkbox" value="remember-me" className="mr-1" />Remember me
                        </label>
                     </div> */}
                     <button className="btn btn-lg btn-info btn-block" name="submit" type="submit" onSubmit={this.handleSubmit} >Log In</button>
                     <hr className="mt-4 bg-light"></hr>
                     <p className="mt-4 mb-3 text-center">Forgot your password?</p>
                  </form>
               </div>
            </React.Fragment>

      )
   }
}

export default Login;