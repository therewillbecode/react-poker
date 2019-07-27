# React-Poker
A High Level React Library For Playing Card Animations

[Click here for a demo](http://therewillbecode.github.io/react-poker)

![react-poker](https://image.ibb.co/ebO3P5/poker.png)

## getting started
install the module inside your project root 
    
    npm install react-poker --save
    
The Deck component takes a board prop which is the array of cards that are dealt and facing up on the community board. 

Internally react motion is used to animate card deals when the board prop changes.
    
    import Deck from "react-poker";
    import "react-poker/styles.css"
    
    const YourComponent = props =>
        <Deck
          board={["3s", "Qh", "As"]} // array of cards to render on board
          boardXoffset={375} // X axis pixel offset for dealing board
          boardYoffset={200} // Y axis pixel offset for dealing board
          size={200} // card height in pixels
        />
   
## example

The example below includes the logic to shuffle a deck of cards.
A new board prop is passed to the Deck component everytime a new card(s) is drawn from the deck or there is a new round.

    import Deck from "react-poker";
    import "react-poker/styles.css"
    
    const range = (start, count) =>
      Array.apply(0, Array(count)).map((element, index) => {
        return index + start;
      });
    
    function shuffle(array) {
      const copy = [];
      let n = array.length;
      let i;
      // While there remain elements to shuffle…
      while (n) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * array.length);
    
        // If not already shuffled, move it to the new array.
        if (i in array) {
          copy.push(array[i]);
          delete array[i];
          n--;
        }
      }
    
      return copy;
    }
    
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
    
    const getDeck = () =>
      shuffle(
        ranks
          .map(r => suits.map(s => r + s))
          .reduce((prev, curr) => prev.concat(curr))
      );
    
    class AppContainer extends Component {
      constructor(props) {
        super(props);
        this.state = { board: [], deck: getDeck() };
        this.progressDeal = this.progressDeal.bind(this);
      }
    
      newRound() {
        const { deck, board } = this.state;
    
        const newDeck = getDeck();
        this.setState(Object.assign({}, { board: [], deck: newDeck }));
      }
    
      dealFlop() {
        const { deck, board } = this.state;
        const flop = range(0, 3).map(e => deck.pop());
    
        this.setState(Object.assign({}, { board: flop, deck }));
      }
    
      dealCard() {
        const { deck, board } = this.state;
        const card = deck.pop();

        this.setState(Object.assign({}, { deck, board: board.concat(card) }));
      }
    
      progressDeal() {
        const { deck, board } = this.state;
    
        if (board.length === 0) {
          this.dealFlop();
          return;
        }
    
        if (board.length === 5) {
          this.newRound();
        } else {
          this.dealCard();
        }
      }

      render() {
        const { board } = this.state;
    
        return (
          <div style={{ left: "10vw", top: "10vh", position: "absolute" }}>
            <button
              style={{ padding: "1.5em", margin: "2em" }}
              onClick={this.progressDeal}
            >
              Deal
            </button>
            <Deck
              board={["3s", "Qh", "As"]}
              boardXoffset={375} // X axis pixel offset for dealing board
              boardYoffset={200} // Y axis pixel offset for dealing board
              size={200} // card height in pixels
            />
          </div>
        );
      }
    }

    export default AppContainer;
    
