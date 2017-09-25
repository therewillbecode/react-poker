import React, { PureComponent } from "react";
import "./Deck.css";
import CardContainer from "./CardContainer";

const range = (start, count) =>
  Array.apply(0, Array(count)).map((element, index) => {
    return index + start;
  });

const spreadShuffle = i => ({
  x: Math.cos(i) * Math.floor(Math.random() * 200 + 1),
  y: Math.sin(i) * Math.floor(Math.random() * 200 + 1),
  z: 0
});

const spread = i => ({
  x: i * 12 - 100,
  y: 50,
  z: 0
});

const fan = i => ({
  x: Math.cos(i) * 95 + 400,
  y: Math.sin(i) * 95,
  z: i
});

const stack = i => ({
  x: 0.1 * i,
  y: 0.1 * i,
  z: i
});

const suits = ["d", "c", "h", "s"];
const ranks = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
];

const getInitialDeck = () =>
  ranks
    .map(r => suits.map(s => ({ rank: r, suit: s })))
    .reduce((prev, curr) => prev.concat(curr));

class DeckContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { board: [], deck: [] };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.board) {
      this.setState({ board: nextProps.board });
    }
  }

  render() {
    const { board } = this.state;
    const { size, flipOnHover, boardYoffset, boardXoffset } = this.props;

    return (
      <div>
        {getInitialDeck().map((card, i) => {
          return (
            <CardContainer
              index={i}
              key={card.rank + card.suit}
              board={board}
              card={card}
              faceDown={true}
              size={size}
              boardXoffset={boardXoffset} // board x offset relative to stack
              boardYoffset={boardYoffset} // board y offset relative to stack
              mapXYZ={stack}
              flipOnHover={flipOnHover}
            />
          );
        })}
      </div>
    );
  }
}

DeckContainer.defaultProps = {
  size: 200,
  boardXoffset: 475,
  boardYoffset: 300,
  flipOnHover: true
};

export default DeckContainer;
