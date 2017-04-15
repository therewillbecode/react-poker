import React, { Component } from 'react'
import R from 'rambda'
import './Deck.css'
import Card from './Card'


const spreadShuffle = i => ({ 
  x: Math.cos(i) * Math.floor((Math.random() * 200) + 1),
  y: Math.sin(i) * Math.floor((Math.random() * 200) + 1), 
  z : 0
})

const spread = i => ({ 
  x: (i * 12.2) -500,
  y: 50, 
  z : 0
})

const fan = i => ({ 
  x: Math.cos(i) * 95,
  y: Math.sin(i) * 95, 
  z : i
})

const stack = i => ({
  x: 0.1 * i,
  y: 0.1 * i, 
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
    setInterval(() => this.setState({ time: Date.now()}), 300)
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
          size={100}
          mapXYZ={spread}
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
