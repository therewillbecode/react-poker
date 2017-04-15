import React, { Component } from 'react'
import R from 'rambda'
import './Deck.css'
import Card from './Card'

function generateDeck () {
  R.range(1, 52)
}

function DrawCards () {

}

const spreadShuffle = i => ({ 
  x: Math.cos(i) * Math.floor((Math.random() * 200) + 1),
  y: Math.sin(i) * Math.floor((Math.random() * 200) + 1), 
  Z : 0
})


const fan = i => ({ 
  x: Math.cos(i) * 95,
  y: Math.sin(i) * 95, 
  z : i
})


// deck takes a mapXYZ prop which is a func that maps a card index to X, Y, Z

// few built in such as fan, spread, sort etc

class Deck extends Component {
  constructor(props){
    super(props)
    this.state = {time: 0}
  }

  componentDidMount(){
    setInterval(() => this.setState({ time: Date.now()}), 400)
  }
  
  spread (index){

  }

  render() {
   const cardSpacing = 22

    return (
      <div>
      {R.range(13, 65).map(i => 
        <Card
          index={i}
          faceDown={false}
          doubleBacked={false}
          size={60}
          mapXYZ={spreadShuffle}
        />
      )}
      </div>
    )
  }
}

Deck.propTypes = {
  // faceDown bool
  // doubleBacked  bool
  
  ///mapXYZ  - func - takes an i and returns {x, y}
}

export default Deck
