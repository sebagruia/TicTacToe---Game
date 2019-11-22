import React, { Component, Fragment } from 'react';
import './Board.css';
import Square from '../Square/Square';


class Board extends Component {

     generatingSquares = (el)=>{
        let squareArray =[];
        for(let j=el; j<el+3;j++){
            let square = (<Square
                    key ={j}
                    value={this.props.squares[j]}
                    onClick={() => this.props.onClick(j)} />);
                squareArray.push(square);
        }
        return squareArray;
    }


    render() {

          const generatingRows = [0,3,6].map((el, i)=>{
                return <div key = {i} className="board-row">
                        {this.generatingSquares(el)}
                    </div>
        })
    

        return (
            <Fragment>
                {generatingRows}
            </Fragment>
        );
    }
}

export default Board;