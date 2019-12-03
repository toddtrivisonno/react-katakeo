import React from 'react';
import Axios from 'axios';


class Navbar extends React.Component {
   constructor(props) {
      super(props);
      this.logout = this.logout.bind(this);
      this.signIn = this.signIn.bind(this);
   }

   logout() {
      const config = {
         headers: { 'Authorization': "Bearer " + this.props.data.token }
      };
      Axios.get('http://127.0.0.1:8000/api/logout', config)
         .then(res => {
            localStorage.removeItem('data');
            this.props.dataStore({});
         })
      this.props.returnHome()
   }

   signIn() {
      this.props.returnHome();
      this.props.showModal()
   }

   render() {

      return (
         <nav className="navbar bg-white" id="navbar">
            <h4 id="title" className="m-0">KATAKEO</h4>
            {
               this.props.data.token
                  ? (
                     <>
                        <p>
                           {this.props.data
                              ? this.props.data.user.name.split(" ", 1)
                              : ""}
                        </p>
                        <button
                           className="btn btn-secondary"
                           onClick={this.logout}
                           name="logout"
                        >
                           Log Out
                     </button>
                     </>
                  )
                  : (<button className="btn btn-info" onClick={this.signIn}>Sign Up</button>
                  )
            }
         </nav>
      )
   }
}

export default Navbar;
