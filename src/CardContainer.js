import React, { PureComponent } from "react";
import { Motion, spring } from "react-motion";

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
  stiffness: 340,
  damping: 88,
  precision: 0.0001
};

const getSprings = (x, y) => ({
  x: spring(x, springConfig),
  y: spring(y, springConfig)
});

class CardContainer extends PureComponent {
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

    if (nextBoard.length === 0 && currBoard.includes(card)) {
      this.flipCard();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const nextBoard = nextProps.board;
    const currBoard = this.props.board;
    const card = this.props.card.rank + this.props.card.suit;
    const isNewBoardCard = this.isNewBoardCard(currBoard, nextBoard, card);

    if (nextState.rotationY !== this.state.rotationY) {
      return true;
    }
    if (
      isNewBoardCard ||
      (nextBoard.length === 0 && currBoard.includes(card))
    ) {
      return true;
    } else {
      return false;
    }
  }

  isNewBoardCard(currBoard, nextBoard, card) {
    const NoNewItems = nextBoard.length - currBoard.length;
    const newIndexes = nextBoard.length - NoNewItems;
    const cardIndex = nextBoard.indexOf(card);

    if (cardIndex >= newIndexes) {
      return true;
    }
    return false;
  }

  flipCard() {
    const currentDegrees = this.state.rotationY;
    const nextDegrees = currentDegrees === 0 ? 180 : 0;
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
      flipOnHover
    } = this.props;
    let { mapXYZ, doubleBacked } = this.props;
    const scale = size / size;
    const width = size * 0.75;
    const height = size;
    const cardValue = card.rank + card.suit;
    if (board.includes(cardValue) === true) {
      mapXYZ = dealBoard(
        cardValue,
        board,
        card,
        size,
        boardXoffset,
        boardYoffset
      );
    }
    const { rotationY } = this.state;

    const defaultStyle = getStyle(index, index, width, height); // initial coords
    const { x, y } = mapXYZ(index, card); // coords to interpolate to
    const scaledX = x * scale; // scale coords for card size
    const scaledY = y * scale;
    const sprungRange = getSprings(scaledX, scaledY);

    const boardCard = board.includes(cardValue);
    if (boardCard) {
      // board cards never doublebacked
      doubleBacked = false;
    }

    const zIndex =
      board.indexOf(cardValue) === -1 ? 1 : board.indexOf(cardValue) + 1;

    return (
      <div
        onMouseEnter={
          flipOnHover ? (
            () => (board.includes(cardValue) ? this.flipCard() : null)
          ) : null
        }
        onMouseLeave={
          flipOnHover ? (
            () => (board.includes(cardValue) ? this.flipCard() : null)
          ) : null
        }
      >
        <Motion defaultStyle={{ x: 1800, y: 1000 }} style={sprungRange}>
          {(
            { x, y } // interpolated x, y values
          ) => (
            <div
              style={getStyle(x, y, width, height, zIndex)}
              className="container"
            >
              <Card
                size={size}
                index={index}
                card={cardValue.toUpperCase()}
                faceDown={this.props.faceDown}
                doubleBacked={doubleBacked}
                rotationY={rotationY}
              />
            </div>
          )}
        </Motion>
      </div>
    );
  }
}

export default CardContainer;
