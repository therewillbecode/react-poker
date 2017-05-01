import React, { PureComponent } from 'react'
import R from 'rambda'
import './Deck.css'

import CardContainer from './CardContainer'

const stack = i => ({
  x: 0.25 * i,
  y: 0.25 * i,
  z: i
})

function convertSuit (suit) {
  switch (suit) {
    case 1:
      return 'h'
    case 2:
      return 'd'
    case 3:
      return 's'
    case 4:
      return 'c'
  }
}

function convertRank (rank) {
  if (rank === 1) return 'A'
  if (rank < 11) return rank

  switch (rank) {
    case 11:
      return 'J'
    case 12:
      return 'Q'
    case 13:
      return 'K'
  }
}

const getSuit = i => convertSuit(i / 13 | 0)

const getRank = i => convertRank((i % 13) + 1)

const getCard = i => ({
  suit: getSuit(i),
  rank: getRank(i)
})

class Deck extends PureComponent {
  componentWillUpdate () {
    this.prevBoard = this.props.board  // store reference for comparison to see if shuffle needed
  }

  render () {
    const cardsArr = R.range(13, 65)
    const { board, boardXoffset, boardYoffset, height } = this.props

    return (
      <div>
        {cardsArr.map(i =>
          <CardContainer
            index={i}
            key={i}
            board={board}
            card={getCard(i)}
            doubleBacked
            faceDown
            height={height}
            boardXoffset={boardXoffset} // board x offset relative to stack
            boardYoffset={boardYoffset} // board y offset relative to stack
            mapXYZ={stack}
        />
      )}
      </div>
    )
  }
}

export default Deck
