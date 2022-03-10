import React, { Component } from 'react';
import store, { colorizeBlock } from '../store';

// class TableCell extends Component {
//     constructor(){
//         super();
//         this.state = {
//             startCol: 0,

//         }
//     }

//     componentDidMount(){

//     }
// } 
let startCol, startRow, endCol, endRow;
const TableCell = ({ cellInx, cell, handleClick}) => {
    
    const handleMouseDown = (e)=> {
        console.log('mouse down eventtttttt', e);
        startCol = e.target.cellIndex;
        startRow = e.target.parentNode.rowIndex;
    }
    const handleMouseUp = (e) => {
        console.log('mouse Upppppp', e);
        endCol = e.target.cellIndex;
        endRow = e.target.parentNode.rowIndex;

        
        store.dispatch(colorizeBlock(startCol, startRow, endCol, endRow));
    }

    


    return(
        <td 
            key={cellInx} 
            className={cell} 
            onClick={(e) => handleClick(e)} 
            onMouseDown={(e) => handleMouseDown(e)}
            // onMouseMove={(e) => handleMouseMove(e)}
            onMouseUp={(e)=> handleMouseUp(e)}
        >
        </td>
    )
}

export default TableCell;



