import React from 'react';
// import Axios from 'axios';


class ChallengeMenu extends React.Component {
   // constructor(props) {
   //    super(props);

   // }


   render() {
      console.log(this.props.fullContent);
      const fullContent = Object.keys(this.props.data.fullContent);


      function challengesList(category) {
         return category.map((challenge, index) => {

            return (
               <li key={index} className="list-group-item list-group-item-action list-group-item-info">{challenge.challenge_name}</li>
            )
         });
      }


      const categoryList = fullContent.map((category, index) => {

         return (

            <li key={index} className="list-group-item list-group-item-action list-group-item-info">
               <ul className="list-group list-group-flush text-center">
                  {category}
                  {challengesList(this.props.data.fullContent[category])}
               </ul>
            </li>

         )

      });

      return (
         <ul className="list-group list-group-flush text-center" >
            {(this.props.data) ? categoryList : (<h1>Loading</h1>)}
         </ul >
      )

   }
}

export default ChallengeMenu;