import React from 'react';

class Game extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      console.log(this.props.selectedChallenge)
      return (
         <>
            <h1>{this.props.selectedChallenge}</h1>
            {/* <p>{this.props.fullContent}</p> */}
            
         </>
      )
   }
}

export default Game;