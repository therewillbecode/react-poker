import React, { PureComponent } from "react";

class Card extends PureComponent {
  shouldComponentUpdate(nextProps) {
    if (nextProps.rotationY !== this.props.rotationY) {
      return true;
    }

    if (nextProps.size !== this.props.size) {
      return true;
    }

    return false;
  }
  render() {
    const { index, card, size, faceDown, rotationY } = this.props;

    return (
      <div id="card" style={{ transform: `rotateY(${rotationY}deg)` }}>
        <img
          className={faceDown === true ? "front" : "back"}
          src={"cards/back.svg"}
          style={{ width: "100%", height: "100%" }}
        />
        <img
          className={faceDown === true ? "back" : "front"}
          src={`cards/${card}.svg`}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  }
}

export default Card;
