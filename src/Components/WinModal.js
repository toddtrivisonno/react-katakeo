
import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class WinModal extends React.Component {
   constructor(props) {
      super(props);

      this.selectNewChallenge = this.selectNewChallenge.bind(this);
   }

   selectNewChallenge() {
      this.props.resetModal();
      this.props.nullSelectedChallenge()
   }

   render() {
      return (
         <div
            className={this.props.checkWin ? 'modal fade show' : 'modal'}
            style={this.props.checkWin ? ({ display: "block" }) : ({ display: "none" })} tabIndex="-1" role="dialog"
         >
            <div className="modal-dialog modal-dialog-centered" >
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="winModalTitle">Nailed It!</h5>
                     <button
                        type="button"
                        className="close"
                        onClick={this.props.resetModal}
                        data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div className="modal-body text-center">
                     <img src="./HAMMER_COLOR_100.png" alt="hammer-icon" />
                  </div>
                  <div className="modal-footer">
                     <button
                        type="button"
                        className="btn btn-outline-secondary"
                        data-dismiss="modal"
                     >
                        Repeat Challenge
                     </button>
                     <button
                        type="button"
                        className="btn btn-warning"
                        onClick={this.selectNewChallenge}
                        data-dismiss="modal"
                        aria-label="Close"
                     >
                        Select New Challenge
                     </button>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default WinModal;
