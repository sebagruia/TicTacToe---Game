import React from 'react';
import '../Square/Square';

const Square = ({ value, onClick, id, squares }) => {

    // This function returns the indexes of the squares that for the winning combination 
    const calculateWinnerLine = (squares) => {
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
                   return  lines[i];
                }
            }
        
    }


  
// This function marks the winning squares
   const markWinnerCombination = ()=>{
    if(calculateWinnerLine(squares)){
       let winningCombination = [...calculateWinnerLine(squares)];
        for(let element of winningCombination){
            if(element===id){
                return 'marked';
            }
       }
       return "";

       }
      
   }


    return (
        <button id={id} className={`square btn btn-outline-dark ${markWinnerCombination()}`} onClick={onClick}>
            {value}
        </button>
    );
}

export default Square;