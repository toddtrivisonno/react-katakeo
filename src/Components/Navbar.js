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
      Axios.get('https://katakeo.appspot.com/api/logout', config)
         .then(res => {
            localStorage.removeItem('data');
            this.props.dataStore({});
         })
      this.props.returnHome()
   }

   signIn() {
      this.props.returnHome();
      this.props.setModal()
   }

   render() {
      return (
         <nav className="navbar bg-white" id="navbar">
            <h4 id="title" className="m-0">KATAKEO</h4>
            {
               this.props.data.token
                  ? (
                     <>
                        <img 
                           src="./LUTH_FLOWER_COLOR_100.png" 
                           className="mr-2 ml-auto" 
                           width="25px" 
                           alt="rose-icon" 
                        />
                        <h5 className="mb-0 mr-2 ml-0">
                           {this.props.data
                              ? this.props.data.user.name.split(" ", 1)
                              : ""}
                        </h5>
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
