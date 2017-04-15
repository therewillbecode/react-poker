import React, { Component } from 'react'
import R from 'rambda'
import './Deck.css'
import Card from './Card'

function generateDeck () {
  R.range(1, 52)
}

function DrawCards () {

}

const m = i => ({ 
  x: i * 1,
  y: i * 10,
  Z : 0
})

// deck takes a mapXYZ prop which is a func that maps a card index to X, Y, Z
// few built in such as fan, spread, sort etc

class Deck extends Component {
  constructor(props){
    super(props)
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
          size={120}
          mapXYZ={m}
        />
      )}
      </div>
    )
  }
}

Deck.propTypes = {
  // faceDown bool
  // doubleBacked  bool
  
  ////positioning props - 
  // stacked
  // fan
  // by suit
  // sort
  // transform is a function that maps position of cards based on index
}

export default Deck
