import React from 'react';
import Axios from 'axios';


class Navbar extends React.Component {
   constructor(props) {
      super(props);
      this.logout = this.logout.bind(this);
   }



   logout() {
      console.log('logout pressed')
      const config = {
         headers: { 'Authorization': "Bearer " + this.props.token }
      };
      Axios.get('http://127.0.0.1:8000/api/logout', config)
         .then(res => {

            localStorage.removeItem('token');
            this.props.tokenFunction("");
         })
   }


   // --- Create Navigation bar with nav buttons --- //
   render() {

      return (
         <div>
            <nav className="navbar bg-white" id="navbar">
               <h4 id="title">KATAKEO</h4>
               <button className="btn btn-info" onClick={this.props.setRegister}>Sign Up</button>
               <button className="btn btn-secondary" onClick={this.logout} name="logout">Log Out</button>
            </nav>
         </div>
      )
   }
}

export default Navbar;