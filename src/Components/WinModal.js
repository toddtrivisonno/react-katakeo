
import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class WinModal extends React.Component {
   constructor(props) {
      super(props);
      // this.state = {

      // }
      // this.handleClick = this.handleClick.bind(this);

   }

   render() {
      return (
         <div className="modal fade" id="winModal" tabIndex="-1" aria-labelledby="winModalTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" >
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="winModalTitle">Nailed It!</h5>
                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <img src="./HAMMER_BLUE_100.jpg" />
                  </div>
                  <div className="modal-footer">
                     <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                     <button type="button" className="btn btn-primary">Save changes</button>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default WinModal;
