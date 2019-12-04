
import React from 'react';

class WinModal extends React.Component {
   constructor(props) {
      super(props);

      this.selectNewChallenge = this.selectNewChallenge.bind(this);
      this.retryChallenge = this.retryChallenge.bind(this);
      this.clearModal = this.clearModal.bind(this);
   }

   selectNewChallenge() {
      this.props.resetModal(false);
      this.props.checkFail(false);
      this.props.nullSelectedChallenge()
   }

   retryChallenge() {
      this.props.resetModal(false);
      this.props.checkFail(false);
   }

   clearModal() {
      this.props.resetModal(false);
      this.props.checkFail(false);
   }

   render() {
      return (
         <>
            {!this.props.failState ? (
               <div
                  className={this.props.checkWin ? 'modal fade show' : 'modal'}
                  style={this.props.checkWin ? ({ display: "block" }) : ({ display: "none" })} tabIndex="-1" role="dialog"
               >
                  <div className="modal-dialog modal-dialog-centered" >
                     <div className="modal-content">
                        <div className="modal-header">
                           <h5 className="modal-title" id="winModalTitle">
                              Challenge Complete
                           </h5>
                           <button
                              type="button"
                              className="close"
                              onClick={this.clearModal}
                              data-dismiss="modal"
                              aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                           </button>
                        </div>
                        <div className="modal-body text-center">
                           <img src="./HAMMER_COLOR_100.png" alt="hammer-icon" />
                           <h3 className="pt-2">Nailed It!</h3>
                        </div>
                        <div className="modal-footer">
                           <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={this.retryChallenge}
                              data-dismiss="modal"
                              aria-label="Close"
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
            ) : (
                  <div
                     className='modal fade show'
                     tabIndex="-1" role="dialog"
                     style={{ display: "block" }}
                  >
                     <div className="modal-dialog modal-dialog-centered" >
                        <div className="modal-content">
                           <div className="modal-header">
                              <h5 className="modal-title" id="failModalTitle">Try again!</h5>
                              <button
                                 type="button"
                                 className="close"
                                 onClick={this.clearModal}
                                 data-dismiss="modal"
                                 aria-label="Close">
                                 <span aria-hidden="true">&times;</span>
                              </button>
                           </div>
                           <div className="modal-body text-center">
                              <img src="./hit-the-books.png" alt="martin-scold" />
                              <h3 className="pt-2">Hit The Books!</h3>
                           </div>
                           <div className="modal-footer">
                              <button
                                 type="button"
                                 className="btn btn-outline-secondary"
                                 onClick={this.retryChallenge}
                                 data-dismiss="modal"
                                 aria-label="Close"
                              >
                                 Retry Challenge
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
         </>
      )
   }
}

export default WinModal;
