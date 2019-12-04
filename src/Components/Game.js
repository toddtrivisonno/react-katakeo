import React from 'react';
import './Game.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Game extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         petition: '',
         splitPetition: [],
         splitStatement: [],
         splitAnswer: [],
         removedPetitionWords: [],
         removedStatementWords: [],
         removedAnswerWords: [],
         printRedactedPetition: [],
         printRedactedStatement: [],
         printRedactedAnswer: [],
         userSelectedWordsPetition: {},
         userSelectedWordsStatement: {},
         userSelectedWordsAnswer: {},
         loaded: false,
         currentChallenge: ''
      }

      this.handlePetitionChange = this.handlePetitionChange.bind(this);
      this.handleStatementChange = this.handleStatementChange.bind(this);
      this.handleAnswerChange = this.handleAnswerChange.bind(this);
      this.buildingState = this.buildingState.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.splitter = this.splitter.bind(this);
      this.splitPetition = this.splitPetition.bind(this);
      this.splitStatement = this.splitStatement.bind(this);
      this.splitAnswer = this.splitAnswer.bind(this);
   }

   componentDidUpdate() {
      if (this.props.selectedChallenge !== this.state.currentChallenge) {
         this.setState({
            petition: '',
            splitPetition: [],
            splitStatement: [],
            splitAnswer: [],
            removedPetitionWords: [],
            removedStatementWords: [],
            removedAnswerWords: [],
            printRedactedPetition: [],
            printRedactedStatement: [],
            printRedactedAnswer: [],
            userSelectedWordsPetition: {},
            userSelectedWordsStatement: {},
            userSelectedWordsAnswer: {},
            loaded: false,
            currentChallenge: ''
         })
         if (this.props.fullContent && this.props.selectedChallenge && this.props.categoryName) {
            this.buildingState();
         }
      }
   }
   buildingState() {

      let petition = this.props.fullContent[this.props.categoryName][this.props.selectedChallenge].content.petition;
      let statement = this.props.fullContent[this.props.categoryName][this.props.selectedChallenge].content.statement;
      let answer = this.props.fullContent[this.props.categoryName][this.props.selectedChallenge].content.answer;
      if (petition) {
         this.splitter(petition, 'petition', 'splitPetition', 'removedPetitionWords');
      }
      if (statement) {

         this.splitter(statement, 'statement', 'splitStatement', 'removedStatementWords');
      }
      if (answer) {

         this.splitter(answer, 'answer', 'splitAnswer', 'removedAnswerWords');
      }
      this.setState({
         loaded: !this.state.loaded,
         currentChallenge: this.props.selectedChallenge
      });
   }

   splitter(array, arrayInState, splitWords, removedWordsState) {
      let splitString = array.split(" ");
      let easyStr = Math.round(splitString.length / 4)

      let removedWords = [];
      while (removedWords.length < easyStr) {
         let random = Math.floor(Math.random() * splitString.length);

         if (!removedWords.includes(random)) {
            let breakInLoop = false
            for (let i = 0; i < removedWords.length; i++) {

               if (splitString[removedWords[i]] === splitString[random]) {
                  breakInLoop = true;
                  break
               }
            }
            if (breakInLoop) {
               continue
            } else {
               removedWords.push(random)
            }
         }
      }
      this.setState({
         [arrayInState]: array,
         [splitWords]: splitString,
         [removedWordsState]: removedWords
      })
   }

   async handlePetitionChange(e) {
      const id = e.target.id;
      const value = e.target.value;
      await this.setState(previousState => ({
         userSelectedWordsPetition:
         {
            ...previousState.userSelectedWordsPetition,
            [id]: value
         }
      }))
   }

   async handleStatementChange(e) {
      const id = e.target.id;
      const value = e.target.value;
      await this.setState(previousState => ({
         userSelectedWordsStatement:
         {
            ...previousState.userSelectedWordsStatement,
            [id]: value
         }
      }))
   }

   async handleAnswerChange(e) {
      const id = e.target.id;
      const value = e.target.value;
      await this.setState(previousState => ({
         userSelectedWordsAnswer:
         {
            ...previousState.userSelectedWordsAnswer,
            [id]: value
         }
      }))
   }

   handleSubmit(event) {
      event.preventDefault();
      let fail = false;
      let check =
         Object.keys(this.state.removedPetitionWords).length +
         Object.keys(this.state.removedStatementWords).length +
         Object.keys(this.state.removedAnswerWords).length;
      let userCheck =
         Object.keys(this.state.userSelectedWordsPetition).length +
         Object.keys(this.state.userSelectedWordsStatement).length +
         Object.keys(this.state.userSelectedWordsAnswer).length;

      if (check !== userCheck) {
         fail = true;
      }

      if (fail) {
         this.props.checkFail(fail);
         this.props.showModal(true);
         return;
      }
      else {
         for (let i = 0; i < Object.keys(this.state.userSelectedWordsPetition).length; i++) {
            let keysPetition = Object.keys(this.state.userSelectedWordsPetition)
            if (this.state.splitPetition[keysPetition[i]] !== this.state.userSelectedWordsPetition[keysPetition[i]]) {
               fail = true;
            }
         }
         if (fail) {
            this.props.checkFail(fail);
            this.props.showModal(true);
            return;
         }
         for (let i = 0; i < Object.keys(this.state.userSelectedWordsStatement).length; i++) {
            let keysStatement = Object.keys(this.state.userSelectedWordsStatement)
            if (this.state.splitStatement[keysStatement[i]] !== this.state.userSelectedWordsStatement[keysStatement[i]]) {
               fail = true;
            }
         }
         if (fail) {
            this.props.checkFail(fail);
            this.props.showModal(true);
            return;
         }
         for (let i = 0; i < Object.keys(this.state.userSelectedWordsAnswer).length; i++) {
            let keysAnswer = Object.keys(this.state.userSelectedWordsAnswer)
            if (this.state.splitAnswer[keysAnswer[i]] !== this.state.userSelectedWordsAnswer[keysAnswer[i]]) {
               fail = true;
            }
         }
         if (fail) {
            this.props.checkFail(fail);
            this.props.showModal(true);
            return;
         }
         else {
            this.props.checkFail(fail);
            this.props.showModal(true);
            return;
         }
      }

   }

   splitPetition() {
      let splitP = this.state.splitPetition;
      let dropdownWord = this.state.removedPetitionWords.map((button, idx) =>
         <option key={idx} value={splitP[button]} >{splitP[button]}</option>
      )
      let printRedactedPetition = [];
      for (let i = 0; i < splitP.length; i++) {
         if (this.state.removedPetitionWords.includes(i)) {
            printRedactedPetition.push(
               <select
                  className="form-control form-control-sm p-0 mr-1 d-inline w-auto"
                  onChange={this.handlePetitionChange}
                  value={this.state.userSelectedWordsPetition[i]}
                  defaultValue="________"
                  id={i}
               >
                  <option
                     value='________'
                     disabled
                  >
                     ________
                  </option>
                  {dropdownWord}
               </select>
            )
         } else {
            printRedactedPetition.push(splitP[i] + ' ')
         }
      }
      return printRedactedPetition;
   }

   splitStatement() {
      let splitS = this.state.splitStatement;
      let dropdownWord = this.state.removedStatementWords.map((button, idx) =>
         <option key={idx} value={splitS[button]} >{splitS[button]}</option>
      )
      let printRedactedStatement = [];
      for (let i = 0; i < splitS.length; i++) {
         if (this.state.removedStatementWords.includes(i)) {
            printRedactedStatement.push(
               <select
                  className="form-control form-control-sm p-0 mr-1 d-inline w-auto"
                  onChange={this.handleStatementChange}
                  defaultValue="________"
                  value={this.state.userSelectedWordsStatement[i]}
                  id={i}
               >
                  <option
                     value='________'
                     disabled>
                     ________
                  </option>
                  {dropdownWord}
               </select>
            )
         } else {
            printRedactedStatement.push(splitS[i] + ' ')
         }
      }
      return printRedactedStatement;
   }

   splitAnswer() {
      let splitA = this.state.splitAnswer;
      let dropdownWord = this.state.removedAnswerWords.map((button, idx) =>
         <option key={idx} value={splitA[button]} >{splitA[button]}</option>
      )
      let printRedactedAnswer = [];
      for (let i = 0; i < splitA.length; i++) {
         if (this.state.removedAnswerWords.includes(i)) {
            printRedactedAnswer.push(
               <select
                  className="form-control form-control-sm p-0 mr-1 d-inline w-auto"
                  onChange={this.handleAnswerChange}
                  value={this.state.userSelectedWordsAnswer[i]}
                  defaultValue="________"
                  id={i}
               >
                  <option
                     value='________'
                     disabled>
                     ________
                           </option>
                  {dropdownWord}
               </select>
            )
         } else {
            printRedactedAnswer.push(splitA[i] + ' ')
         }
      }
      return printRedactedAnswer;
   }

   render() {
      return (
         <>
            {this.props.fullContent && this.props.categoryName && this.props.selectedChallenge ? (
               <div className="game-view bg-light">
                  <div className="bg-warning text-center p-2">
                     <h3 className="text-muted text-white">{this.props.categoryName}</h3>
                     <div>
                        <h5>
                           {this.props.fullContent[this.props.categoryName][this.props.selectedChallenge].challenge_name}
                        </h5>
                     </div>
                  </div>
                  <div className="font-weight-bold p-2">
                     {this.splitPetition()}
                  </div>
                  <div className="font-italic p-2">
                     {this.props.fullContent[this.props.categoryName][this.props.selectedChallenge].content.initial_question}
                  </div>
                  <div className="p-2">
                     {this.splitStatement()}
                  </div>
                  <div className="font-italic p-2">
                     {this.props.fullContent[this.props.categoryName][this.props.selectedChallenge].content.following_question}
                  </div>
                  <div className="p-2">
                     {this.splitAnswer()}
                  </div>
                  <div className="text-center pb-2">
                     <button className="btn btn-outline-info" onClick={this.handleSubmit} type="submit" value="Submit">Submit</button>
                  </div>
                  <br />
                  <br />
                  <button
                     className="m-0 bg-secondary btn fixed-bottom" onClick={this.props.nullSelectedChallenge}>
                     <FontAwesomeIcon
                        icon="arrow-left" size="lg" className="m-2" color="white"
                     />
                  </button>
               </div>
            ) : null}
         </>
      )
   }
}

export default Game;
