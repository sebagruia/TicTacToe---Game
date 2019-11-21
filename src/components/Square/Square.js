import React from 'react';
import '../Square/Square';

const Square = ({ value, onClick }) => {
    return (
        <button className="square btn btn-outline-dark" onClick={onClick}>
            {value}
        </button>
    );
}

export default Square;