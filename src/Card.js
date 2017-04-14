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

const Card = props => {
  const { index, faceDown, doubleBacked, size } = props

  if(doubleBacked){
    return (
     <img src={window.Poker.getBackData(size)} />
    )
  }
  
  const attributes = getAttributes(index)
  let { suit, rank } = attributes
  rank = convertRank(rank)
  suit = convertSuit(suit)

  return <img src={window.Poker.getCardData(size, suit, rank)} />
} 

export default Card
