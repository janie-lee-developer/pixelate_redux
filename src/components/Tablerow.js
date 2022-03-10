import React from 'react';
import TableCell from './TableCell';

const Tablerow = ({ row , handleClick }) => {
    return(
        <tr>
            {
                row.map((cell, cellInx) => {
                    return <TableCell key= {cellInx} cell={cell} handleClick = {handleClick} />
                })
            }
        </tr>
    )
}

export default Tablerow;


