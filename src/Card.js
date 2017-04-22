import React, { PureComponent} from 'react'



const getSrc = (card, size) => {
  let { suit, rank } = card
  return window.Poker.getCardData(size, suit, rank)
}

class Card extends PureComponent {
  render () {
    const { index, card, size, doubleBacked, faceDown, rotationY} = this.props
    const backSrc = window.Poker.getBackData(size)
    let src = null

    if (doubleBacked) {
      src = backSrc
    } else {
      src = getSrc(card, size)
    }

    return (
      <div id='card' style={{transform: `rotateY(${rotationY}deg)`}}>
        <img className={faceDown == true ? 'front' : 'back'} src={backSrc} />
        <img className={faceDown == true ? 'back' : 'front'}  src={src} />
      </div>
    )
  }
}

export default Card
