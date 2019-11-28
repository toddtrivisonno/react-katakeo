import React from 'react';
// import './ChallengeMenu.css';

class ChallengeMenu extends React.Component {
   // constructor(props) {
   //    super(props);
   // }

   render() {
      
      const this_ = this;
      function challengesList(category,name) {
         // console.log(name);
         return category.map((challenge, index) => {
            return (
               <li key={index} className="list-group-item list-group-item-action list-group-item-info">
                  <button 
                  id={index} 
                  name={name} 
                  onClick={this_.props.getSelectedChallenge}
                  >
                     {challenge.challenge_name}
                  </button>
               </li>
            )
         });
      }

      function categoryList(fullContent) {

         return fullContent.map((category, index) => {
            return (
               <div className="card bg-info text-center" key={index}>
                  <div className="card-header" id={'heading' + index}>
                     <h5 className="m-2">
                        <button className="btn text-white btn-lg btn-block" type="button" data-toggle="collapse" data-target={'#collapse' + index} aria-expanded="true" aria-controls={'collapse' + index}>
                           {category}
                        </button>
                     </h5>
                  </div>
                  <div id={'collapse' + index} className="collapse" aria-labelledby={'heading' + index} data-parent="#accordionExample">
                     <div className="card-body">
                        <ul className="list-group list-group-flush text-center" >
                           {challengesList(this_.props.fullContent[category],category)}
                        </ul>
                     </div>
                  </div>
               </div>
            )
         });
      }
      return (
         <div className="accordion" id="accordionExample">
            {this.props.fullContent ? categoryList(Object.keys(this.props.fullContent)) : (<h1>Loading</h1>)}
         </div>
      )
   }
}

export default ChallengeMenu;