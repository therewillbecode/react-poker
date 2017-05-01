import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Deck from './Deck'

class DeckContainer extends Component {
  constructor(props){
    super(props)
    // probs shouldnt be in state maybe use props
    this.state = { board: [] }
  }
  
  componentDidMount(){
    setTimeout(() => this.setState({board: ['Ah', 'Ac', 'Ad'] }), 900)
    setTimeout(() => this.setState({board: ['Ah', 'Ac', 'Ad','2d'] }), 2200)
    setTimeout(() => this.setState({board: ['Ah', 'Ac', 'Ad','2d', '9d'] }), 3200)
    setTimeout(() => this.setState({board: [] }), 5200)  
}

 render(){
   const { board } = this.state

   return (
     <Deck
      board={board}
      boardXoffset={575} // board x offset relative to stack
      boardYoffset={400} // board y offset relative to stack
      height={200}
     />
   )
 }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <DeckContainer />
        </div>
      </div>
    );
  }
}

export default App;
