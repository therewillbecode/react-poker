import React, { Component } from 'react'
import './Card.css'

const Card = props => {
  const { reversed } = props

  if(reversed){
    return (
     <img src={window.Poker.getBackData(200)} />
    )
  }

  return <img src={window.Poker.getCardData(200, 'hearts','q')} />

} 

export default Card
