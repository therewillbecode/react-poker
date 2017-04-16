import React, { Component } from 'react'
import { Motion, spring } from 'react-motion'
import R from 'rambda'

import './Card.css'

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

const getStyle = (x, y) => ({
  WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
  transform: `translate3d(${x}px, ${y}px, 0) rotateY(${0}deg) rotate(${0}deg)`,
  position: 'absolute',
})

const springConfig = {
  stiffness: 170,
  damping: 27
}

const getSprings = (x, y) => ({
  x: spring(x, springConfig),
  y: spring(y, springConfig)
})

const defaultMapXYZ = i => ({
  x: i * 4,
  y: i * 4,
  z: i
})

const Card = props => {
  const { index, faceDown, doubleBacked, mapXYZ, size} = props
  const defaultSize = 60 // px size of cards preset animation funcs based on
  const scale = size / defaultSize
  const backSrc = window.Poker.getBackData(size)

  let src = null
  if (doubleBacked) {
    src = backSrc
  } else {
    src = getSrc(index, size)
  }

  const defaultStyle = getStyle(index * 3, index * 2) // initial coords
  const { x, y } = mapXYZ(index) // coords to interpolate to
  const scaledX = x * scale  // scale coords for card size
  const scaledY = y * scale
  const sprungRange = getSprings(scaledX, scaledY)

  return (
    <Motion defaultStyle={{x: 1800, y: 1000}} style={sprungRange}>
      {({x, y}) => // interpolated x, y values
       <div style={getStyle(x, y, index)} >
        <img
          className='front'
          src={src}
        />
        <img 
          className='back'
          src={src}
          
       />
      </div>
     }
    </Motion>
  )
}

export default Card
