import React from 'react';
import Axios from 'axios';


class Navbar extends React.Component {
   constructor(props) {
      super(props);
      this.logout = this.logout.bind(this);
   }

   logout() {
      const config = {
         headers: { 'Authorization': "Bearer " + this.props.token }
      };
      Axios.get('http://127.0.0.1:8000/api/logout', config)
         .then(res => {

            localStorage.removeItem('token');
            localStorage.removeItem('data');
            this.props.dataStore({});
         })
   }

   // --- Create Navigation bar with nav buttons --- //
   render() {

      return (
            <nav className="navbar bg-white" id="navbar">
               <h4 id="title" className="m-0">KATAKEO</h4>
               {
                  this.props.token
                     ? (<button className="btn btn-secondary" onClick={this.logout} name="logout">Log Out</button>)
                     : (<button className="btn btn-info" onClick={this.props.setRegister}> {this.props.register ? "Log In" : "Sign Up"} </button>)
               }
            </nav>
      )
   }
}

export default Navbar;
