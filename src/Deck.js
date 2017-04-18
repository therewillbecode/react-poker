import React, { PureComponent, Component } from 'react'
import R from 'rambda'
import './Deck.css'
import CardContainer from './CardContainer'
import { List, fromJS } from 'immutable'

import Perf from 'react-addons-perf'; // ES6

const spreadShuffle = i => ({ 
  x: Math.cos(i) * Math.floor((Math.random() * 200) + 1),
  y: Math.sin(i) * Math.floor((Math.random() * 200) + 1), 
  z : 0
})

const spread = i => ({ 
  x: (i * 12) - 100,
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

// have one function that uses 3d flips to drop cards onto surface

// deck takes a mapXYZ prop which is a func that maps a card index to X, Y, Z

// few built in such as fan, spread, sort etc

class Deck extends Component {
  constructor(props){
    super(props)
    this.state = { time: 0 }
  }

  componentDidMount(){
    Perf.start()

    setTimeout(() => {
      this.setState({ time: Date.now()})
      Perf.stop()

      console.log(Perf.printInclusive())
    }
    ,  2800  )
  }

  render() {
   const cardsArr = List(R.range(13, 65))

    return (
      <div>
      {cardsArr.map(i => 
        <CardContainer
          index={i}
          key={i}
          faceDown={false}
          doubleBacked={false}
          size={100}
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
