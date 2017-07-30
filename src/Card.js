import React, { Component } from "react";

class Card extends Component {
  render() {
    const {
      index,
      card,
      size,
      cardBack,
      cardFront,
      faceDown,
      rotationY
    } = this.props;

    return (
      <div id="card" style={{ transform: `rotateY(${rotationY}deg)` }}>
        <img className={faceDown === true ? "front" : "back"} src={cardBack} />
        <img className={faceDown === true ? "back" : "front"} src={cardFront} />
      </div>
    );
  }
}

export default Card;
