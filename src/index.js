import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap.css'
import ship from './img/Battleship-2.png';
import bomb from './img/black-bomb.png';

const gameConstants = {
    name: "Battleship",
    nbrOfSquares: 25,
    nbrOfShips: 3,
    maxNumberOfGuesses: 15
}

function Square(props){
    return (
       <button className="square"
            onClick={props.onClick}>
             {props.value}
            </button>
       );      
}


class Board extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            squares: Array(gameConstants.nbrOfSquares).fill(null),
            ships: this.randomShips(),
            hits: 0,
            guesses:gameConstants.maxNumberOfGuesses,
            remainingShipsText: false,
            shipsSinkedText: false,
            buttonText: "Start game",
            isGameOverText: false,
            isStart: false,
            isStartText: false,
            remainingShips: gameConstants.nbrOfShips,         
            seconds: 0,
            isCounting: false,
            isTimeOutText: false,
            isNewGame: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * randomShips() returns an array of
     * ships places
     */
    randomShips(){
      let ships = [];
      for(let i = 0;  i < 3; i++) {
            let rnd = Math.floor(Math.random() * 24) + 1;
            if (ships.indexOf(rnd) === -1) {
               ships.push(rnd);  
            }
       }
      return ships;
    }

    tick() {
      this.setState(state => ({
          seconds: state.seconds + 1
      }));
      
    }
    setInterval() {
      this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    /**
     * handleClick() handles the clicking of the board
     * gets index of the square as a parameter
     */
    handleClick(i) {   
      const squares = this.state.squares.slice();
      const shipsPlaces = this.state.ships;
      let guesses = this.state.guesses;
      let hits = this.state.hits;
      let isStart = this.state.isStart;
      let remainingShips = this.state.remainingShips;
      let isNewGame = this.state.isNewGame;
    
      if (!isStart && isNewGame) { 
        this.setState({
          isStartText: true   
        });
        
      }

      if (isStart) { 

        if (squares[i]){
          return;
        }

          if (guesses > 0) {    

            squares[i] = <img className="img-size" src={bomb} alt=""/>;
            
            guesses = guesses -1;

            this.setState({
              guesses: guesses,
              squares: squares, 
            });

          } 

          if(i === shipsPlaces[0] || i === shipsPlaces[1] || i === shipsPlaces[2])  {
            squares[i] = <img className="img-size" src={ship} alt=""/>;
            hits = hits +1;
            remainingShips = remainingShips -1;   

            this.setState({
              hits: hits,
              squares: squares,
              remainingShips: remainingShips,    
            });
          } 

        if (hits === gameConstants.nbrOfShips) {
          this.setState({
            isCounting: false,
            buttonText: "New game",
            remainingShips: remainingShips,
            shipsSinkedText: true,
            isStart: false,
            isStartText: false,
            isNewGame: false
          });

          clearInterval(this.interval);
        }

        if (guesses === 0) {  
          this.setState({
            isStart: false,
            isCounting: false,
            buttonText: "New game",
            isGameOverText: true,
            remainingShipsText: true,
            remainingShips: remainingShips,
            isStartText: false,
            isNewGame: false
          });

          clearInterval(this.interval);
        }

        if(guesses === 0 && hits === gameConstants.nbrOfShips){
          this.setState({
            remainingShipsText: false,
            isNewGame: false
          });
        } 

        if (this.state.seconds > 30) {
          this.setState({ 
            isTimeOutText: true,
            buttonText: "New game",
            isGameOverText: true,
            remainingShipsText: true,
            isStart: false,
            isStartText: false,
            isNewGame: false
          });

          clearInterval(this.interval);
        }
  
      }
    }

    /**
     * handleSubmit() handles the clicking of the submit button
     */ 
    handleSubmit(event) {
      event.preventDefault();

      let buttonValue = this.state.buttonText;

      if (buttonValue === "Start game") {
        this.setState({
          isStart: true,
          buttonText: "New game",
          isNewGame: true,
          isStartText: false
        });

        this.setInterval();
        this.tick();

      }

      if (buttonValue === "New game") {
        this.setState({
          squares: Array(gameConstants.nbrOfSquares).fill(null),
          ships: this.randomShips(),
          hits: 0,
          guesses:gameConstants.maxNumberOfGuesses,
          isGameOver: false,
          buttonText: "Start game",
          isGameOverText: false,
          isStart: false,
          remainingShips: gameConstants.nbrOfShips,     
          isStartText: false,
          isTimeOutText: false,
          remainingShipsText: false,
          shipsSinkedText: false,
          isNewGame: true,
          seconds: 0
        });

        clearInterval(this.interval);

      }
    }

    renderSquare(i) {
        return (
          <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
          />
        );  
      }
    

    render() {
      return (
        <div className="area-border">
          <div className="status text-success"><h1>{gameConstants.name}</h1></div>
          <div className="status">Hits: {this.state.hits}</div>
          <div className="status">Bombs remaining: {this.state.guesses}</div>
          <div className="status">Ships remaining: {this.state.remainingShips}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
            {this.renderSquare(4)}
          </div>
          <div className="board-row">
            {this.renderSquare(5)}
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            {this.renderSquare(9)}
          </div>
          <div className="board-row">
            {this.renderSquare(10)}
            {this.renderSquare(11)}
            {this.renderSquare(12)}
            {this.renderSquare(13)}
            {this.renderSquare(14)}
          </div>
          <div className="board-row">
            {this.renderSquare(15)}
            {this.renderSquare(16)}
            {this.renderSquare(17)}
            {this.renderSquare(18)}
            {this.renderSquare(19)}
          </div>
          <div className="board-row">
            {this.renderSquare(20)}
            {this.renderSquare(21)}
            {this.renderSquare(22)}
            {this.renderSquare(23)}
            {this.renderSquare(24)}
          </div>
          <div className="badge text-danger"><h2>{this.state.isGameOverText ? 'Game over':''}</h2></div>
          <form onSubmit={this.handleSubmit}>
              <button className= "btn btn-primary mt-2 mb-2">{this.state.buttonText}</button>
          </form>
          <p className="status">Seconds: {this.state.seconds}</p>
          <div className="status">{this.state.shipsSinkedText ? 'You sinked all ships':''}</div>
          <div className="status">{this.state.isStartText ? 'Click the start button first...' : ''}</div>
          <div className="status">{this.state.isTimeOutText ? 'Timeout (30 secs).' : ''}</div>
          <div className="status">{this.state.remainingShipsText ? 'Ships remaining':''}</div>
        </div>
      );
    }
  }


  class Game extends React.Component {

            render() {
              return (
                <div className="container">
                  <div className="row  game-board">
                    <div className="d-flex justify-content-center col-12  ">
                      <Board /> 
                    </div>
                  </div>
                </div>
              );
            }
  }

        
ReactDOM.render(<Game />, document.getElementById('root'));







