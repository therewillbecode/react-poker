import React, { PureComponent} from 'react'

const getSrc = (card, height) => {
  let { suit, rank } = card
  return window.Poker.getCardData(height, suit, rank)
}

class Card extends PureComponent {
  render () {
    const { index, card, height, doubleBacked, faceDown, rotationY} = this.props
    const backSrc = window.Poker.getBackData(height)
    let src = null

    if (doubleBacked) {
      src = backSrc
    } else {
      src = getSrc(card, height)
    }

    return (
      <div id='card' style={{transform: `rotateY(${rotationY}deg)`}}>
        <img className={faceDown === true ? 'front' : 'back'} src={backSrc} />
        <img className={faceDown === true ? 'back' : 'front'} src={src} />
      </div>
    )
  }
}

export default Card
