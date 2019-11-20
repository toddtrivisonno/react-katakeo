import React from 'react';

class Navbar extends React.Component {
   // constructor(props) {
   //    super(props);
   // }

   // --- Create Navigation bar with nav buttons --- //
   render() {

      return (
         <React.Fragment>
            <div>
               <nav className="navbar bg-white" id="navbar">
               <h4 id="title">KATAKEO</h4>
                  <button className="btn btn-info">Sign Up</button>
               </nav>
            </div>
         </React.Fragment>
      )
   }
}

export default Navbar;