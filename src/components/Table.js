import React from 'react';
import Tablerow from './Tablerow';

const Table = ({ grid, handleClick }) => {
    return(
        <table>
            <tbody>
                {
                    grid.map((row, rowInx) => {
                        return <Tablerow key={rowInx} row={row} handleClick={ handleClick }/>
                    })}
            </tbody>
        </table>
    )
}

export default Table;


