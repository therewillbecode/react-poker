import React from 'react'
import { Motion, spring } from 'react-motion'

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

const getSuit = i => i / 13 | 0

const getRank = i => i % 13 + 1

const getAttributes = i => ({
  suit: getSuit(i),
  rank: getRank(i)
})

const getSrc = (index, size) => {
  const attributes = getAttributes(index)
  let { suit, rank } = attributes
  rank = convertRank(rank)
  suit = convertSuit(suit)

  return window.Poker.getCardData(size, suit, rank)
}

const Card = props => {
  const { index, size, doubleBacked, rotationY } = props
  const backSrc = window.Poker.getBackData(size)

  let src = null
  if (doubleBacked) {
    src = backSrc
  } else {
    src = getSrc(index, size)
  }

  return (
    <div id='card' style={{ transform: `rotateY(${rotationY}deg)`}}>
      <img className='front' src={backSrc} />
      <img className='back' src={src} />
    </div>
  )
}

export default Card
