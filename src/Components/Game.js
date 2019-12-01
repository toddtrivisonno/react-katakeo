import React from 'react';
// import './Game.css';


class Game extends React.Component {
   constructor(props) {
      super(props);

      this.splitString = this.splitString.bind(this);
      this.checkAnswer = this.checkAnswer.bind(this);
   }

   splitString() {
      let petition = this.props.fullContent[this.props.categoryName][this.props.selectedChallenge].content.petition;
      // let statement = this.props.fullContent[this.props.categoryName][this.props.selectedChallenge].content.statement;
      // let answer = this.props.fullContent[this.props.categoryName][this.props.selectedChallenge].content.answer;

      if (petition) {
         let splitPetition = petition.split(" ");
         let easyPetition = Math.round(splitPetition.length / 4)

         let removedPetitionWords = [];
         while (removedPetitionWords.length < easyPetition) {
            let random = Math.floor(Math.random() * splitPetition.length);

            if (!removedPetitionWords.includes(random)) {
               removedPetitionWords.push(random)
            }
            // console.log(removedPetitionWords);
         }

         let dropdownWord = removedPetitionWords.map((button, idx) =>
            <option key={idx} >{splitPetition[button]}</option>
         )

         let printRedactedPetition = [];
         for (let i = 0; i < splitPetition.length; i++) {
            if (removedPetitionWords.includes(i)) {
               printRedactedPetition.push(
                  <>
                     <select 
                        className="form-control form-control-sm p-0 mr-1 d-inline w-auto"
                        >
                        <option selected>______</option>
                        {dropdownWord}
                     </select>
                  </>
               )
            } else {
               printRedactedPetition.push(splitPetition[i] + ' ')
            }
         }
         return printRedactedPetition;

      }

      // if (statement) {
      //    let splitStatement = statement.split(" ");
      //    let easyStatement = Math.round(splitStatement.length / 4)
      // }

      // if (answer) {
      //    let splitAnswer = answer.split(" ");
      //    console.log(splitAnswer)
      //    let easyAnswer = Math.round(splitAnswer.length / 4)
      //    console.log(easyAnswer)
      // }
   }

checkAnswer (event) {

}



   render() {

      return (
         <>
            {this.props.fullContent && this.props.categoryName && this.props.selectedChallenge ? (
               <>
                  <div className="bg-warning text-center p-2">
                     <h3 className="text-muted text-white">{this.props.categoryName}</h3>
                     <div>
                        <h5>
                           {this.props.fullContent[this.props.categoryName][this.props.selectedChallenge].challenge_name}
                        </h5>
                     </div>
                  </div>
                  <div className="font-weight-bold p-2">
                     {/* {this.props.fullContent[this.props.categoryName][this.props.selectedChallenge].content.petition} */}
                     {this.splitString()}
                  </div>
                  <div className="font-italic p-2">
                     {this.props.fullContent[this.props.categoryName][this.props.selectedChallenge].content.initial_question}
                  </div>
                  <div className="p-2">
                     {this.props.fullContent[this.props.categoryName][this.props.selectedChallenge].content.statement}
                  </div>
                  <div className="font-italic p-2">
                     {this.props.fullContent[this.props.categoryName][this.props.selectedChallenge].content.following_question}
                  </div>
                  <div className="p-2">
                     {this.props.fullContent[this.props.categoryName][this.props.selectedChallenge].content.answer}
                     {/* {this.splitString()} */}
                  </div>
                  <div className="text-center pb-2">
                     <button className="btn btn-outline-info" onClick={this.checkAnswer} type="submit" value="Submit">Submit</button>
                  </div>
               </>
            ) : null}

         </>
      )
   }
}

export default Game;