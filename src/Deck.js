import React, { Component } from 'react'
import R from 'rambda'
import './Deck.css'
import Card from './Card'

function generateDeck () {
  R.range(1, 52)
}

function DrawCards () {

}


class Deck extends Component {
  constructor(props){
    super(props)
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
        />
      )}
      </div>
    )
  }
}

Deck.propTypes = {
  // faceDown bool
  // doubleBacked  bool
}

export default Deck
