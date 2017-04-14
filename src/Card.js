import React, { Component } from 'react'
import './Card.css'


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
