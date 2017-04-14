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
      <Card reversed={false}/>
    )
  }
}

Deck.propTypes = {

}

export default Deck
