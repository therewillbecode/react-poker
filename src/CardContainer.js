import React, { Component } from "react";
import { Motion, spring } from "react-motion";
import { fromJS, toJS, Map } from "immutable";

import "./Card.css";
import Card from "./Card";

const dealBoard = (value, board, card, size, boardX, boardY) => {
  return () => ({
    x: boardX + size * board.indexOf(value),
    y: boardY,
    z: 0
  });
};

const getStyle = (x, y, width, height, zIndex) => ({
  WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
  transform: `translate3d(${x}px, ${y}px, 0)  rotate(${0}deg)`,
  position: "absolute",
  width: `${width}px`,
  height: `${height}px`,
  zIndex: `${zIndex}`
});

const springConfig = {
  stiffness: 340, // 230
  damping: 88, // 47
  precision: 0.0001
};

const getSprings = (x, y) => ({
  x: spring(x, springConfig),
  y: spring(y, springConfig)
});

// change back to pure component - TODO
class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { rotationY: 0 };
    this.flipCard = this.flipCard.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const nextBoard = nextProps.board;
    const currBoard = this.props.board;
    const card = this.props.card.rank + this.props.card.suit;
    const isNewBoardCard = this.isNewBoardCard(currBoard, nextBoard, card);

    if (isNewBoardCard) {
      const flipDelayScale = 1 / (1 + nextBoard.indexOf(card)) / 10 + 1; // delay based on distance to travel to board
      setTimeout(() => this.flipCard(), 500 * flipDelayScale);
    }
  }

  isNewBoardCard(currBoard, nextBoard, card) {
    const NoNewItems = nextBoard.length - currBoard.length;
    const newIndexes = nextBoard.length - NoNewItems;
    const cardIndex = nextBoard.indexOf(card);

    if (cardIndex >= newIndexes && cardIndex <= cardIndex) {
      return true;
    }
    return false;
  }

  flipCard() {
    const currentDegrees = this.state.rotationY;
    const nextDegrees = fromJS(currentDegrees === 0 ? 180 : 0);
    this.setState({ rotationY: nextDegrees });
  }

  render() {
    const {
      index,
      size,
      card,
      board,
      boardXoffset,
      boardYoffset,
      stackLeft,
      stackTop
    } = this.props;
    let { mapXYZ } = this.props;
    const scale = size / size;
    const width = size * 0.75;
    const height = size;
    const value = card.rank + card.suit;
    if (board.includes(value) === true) {
      mapXYZ = dealBoard(value, board, card, size, boardXoffset, boardYoffset);
    }
    const { rotationY } = this.state;

    const defaultStyle = getStyle(index, index, width, height); // initial coords
    const { x, y } = mapXYZ(index, card); // coords to interpolate to
    const scaledX = x * scale; // scale coords for card size
    const scaledY = y * scale;
    const sprungRange = getSprings(scaledX, scaledY);

    let { doubleBacked } = this.props;
    const boardCard = board.includes(value);
    if (boardCard) {
      // board cards never doublebacked
      doubleBacked = false;
    }

    const zIndex = board.indexOf(value) === -1 ? 1 : board.indexOf(value) + 1;

    // flippable    onMouseEnter={this.flipCard} onMouseLeave={this.flipCard}
    return (
      <div>
        <Motion defaultStyle={{ x: 1800, y: 1000 }} style={sprungRange}>
          {(
            { x, y } // interpolated x, y values
          ) =>
            <div
              style={getStyle(x, y, width, height, zIndex)}
              className="container"
            >
              <Card
                size={size}
                index={index}
                card={card}
                faceDown={this.props.faceDown}
                doubleBacked={doubleBacked}
                rotationY={rotationY}
              />
            </div>}
        </Motion>
      </div>
    );
  }
}

export default CardContainer;
