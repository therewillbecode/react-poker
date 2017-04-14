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

    const style = { transform: `translateX(${cardSpacing})` }


    return (
      <div>
      {R.range(0, 65).map(i => 
        <Card
          index={i}
          faceDown={false}
          doubleBacked={false}
          size={60}
          style={style}
          className='card'
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
