import React, {Component,Fragment} from 'react';
import '../containers/Game.css';
import Board from '../components/Board/Board';
import confetti from '../confetti';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber:0,
            xIsNext: true,
            checkWinner:false,
            // winningCombination:[]
        }
    }


    handleClick = (i) => {
        const history = this.state.history;
        const current = history[history.length - 1];
        // const squares = current.squares.slice(); This another solution to copy an array
        const squares = [...current.squares];
        if (this.calculateWinner(squares)) {
            return ;
        }

        if(squares[i]){
            return

        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            // history: history.concat([{  //the same output is achieved  also with CONCAT
            //     squares: squares // }]),
            history: [...history, { squares }],
           
            stepNumber:history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo = (step)=>{
        this.setState({
            stepNumber:step,
            xIsNext:(step%2)===0
        });
    }

    // This function restarts the game 
    refresh = ()=>{
        this.setState({  
            history: [
            {
                squares: Array(9).fill(null)
            }
        ],
        stepNumber:0,
        xIsNext: true,
        checkWinner:false
    });
        confetti.stopConfetti();

    }
    

// This function displays the Winner 
    calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);


        const moves = history.map((step, move) => {
            const desc = move ?
                `Go to move # ${move}` :
                `Go to game Start`

            return (
                <li key={move} class="history-li">
                    <button className=" jumpTo-button btn btn-outline-dark" onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>


            );

        });

        let status;
        if (winner) {
            status = `Winner ${winner}`;
            confetti.startConfetti();
        }
        else {
            status = `Next Player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        

        return (
            <Fragment>
                
                <div className="game">
                <div className="title">
                    <h1 className="game-title">TicTacToe</h1>
                    <i className="fas fa-retweet" role="button" onClick={this.refresh}></i>
                </div>
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                            />
                    </div>
                    <div className="game-info">
                        <div className="winner-name">{status}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
            </Fragment>
            
        );
    }
}

export default Game;