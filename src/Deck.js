import React, { Component } from "react";
import "./Deck.css";
import CardContainer from "./CardContainer";
import { List, fromJS } from "immutable";

import Perf from "react-addons-perf"; // ES6

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

function convertSuit(suit) {
  switch (suit) {
    case 1:
      return "h";
    case 2:
      return "d";
    case 3:
      return "s";
    case 4:
      return "c";
  }
}

function convertRank(rank) {
  if (rank === 1) return "A";
  if (rank < 11) return rank;

  switch (rank) {
    case 11:
      return "J";
    case 12:
      return "Q";
    case 13:
      return "K";
  }
}

const getSuit = i => convertSuit((i / 13) | 0);

const getRank = i => convertRank(i % 13 + 1);

const getCard = i => ({
  suit: getSuit(i),
  rank: getRank(i)
});

class DeckContainer extends Component {
  constructor(props) {
    super(props);
    // probs shouldnt be in state maybe use props
    this.state = { board: [] };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.board) {
      this.setState({ board: nextProps.board });
    }
  }

  render() {
    const cardsArr = List(range(13, 65));
    const { board, boardXoffset, boardYoffset } = this.state;

    return (
      <div>
        {cardsArr.map(i =>
          <CardContainer
            index={i}
            key={i}
            board={board}
            card={getCard(i)}
            doubleBacked={true}
            faceDown={true}
            size={200}
            boardXoffset={475} // board x offset relative to stack
            boardYoffset={300} // board y offset relative to stack
            mapXYZ={stack}
          />
        )}
      </div>
    );
  }
}

export default DeckContainer;
