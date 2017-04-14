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

    return (
      <Card index={11} faceDown={false} doubleBacked={false} size={100} />
    )
  }
}

Deck.propTypes = {
  // faceDown bool
  // doubleBacked  bool
}

export default Deck
