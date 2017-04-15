import React, { Component } from 'react'
import './Card.css'

function convertSuit (suit) {
  switch(suit){
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
  if(rank === 1) return 'A'
  if (rank < 11) return rank 

  switch(rank){
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

const getStyle = mapXYZ => i => {
  const { x , y, z} = mapXYZ(i)
  return {
    WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
    transform: `translate3d(${x}px, ${y}px, 0)`,
    position: 'absolute'
  }
}

const Card = props => {
  const { index, faceDown, doubleBacked, mapXYZ, size} = props
  let src = null
  if(doubleBacked){
    src = window.Poker.getBackData(size)
  } else {
    src = getSrc(index, size)
  }
  
  const style = getStyle(mapXYZ)(index)
  
  return (
      <img
        src={src}
        style={style}
      />
  )
} 

export default Card
