// We'll dive deeper into middleware later.
// For now, it's enough to know that this loggerMiddleware prints out useful
// information about everything that happens in your store.
// Much like requests in express pass from middleware to middleware, actions in redux
// pass from middleware to middleware. The loggerMiddleware gets a chance to see
// actions before they are processed. They get in the middle, hence, middleware.
import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'

// We'll soon revisit the initial state of this application.
const initialState = {
    grid: [
        Array(20).fill('')
    ],
    selectedColor:'red'
}

// ACTION TYPES
/* we'll add some action types soon */
const ADD_ROW = 'ADD_ROW';
const PICK_COLOR = 'PICK_COLOR';
const COLORIZE = 'COLORIZE';
const COLORIZE_BLOCK = 'COLORIZE_BLOCK';


// ACTION CREATORS
/* we'll also add the corresponding action creators */
export const addRow = () => ({ type: ADD_ROW });
export const pickColor = (color) => ({ type: PICK_COLOR, color });
export const colorize = (row, column) => ({type: COLORIZE, row, column});
export const colorizeBlock = (startCol, startRow, endCol, endRow) => ({ type: COLORIZE_BLOCK, startCol, startRow, endCol, endRow})

// store.dispatch(colorizeBlock(startCol, startRow, endCol, endRow));

// And we'll revisit this reducer.
function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ROW:
            const numCols = state.grid[0].length
            const newRow = Array(numCols).fill('')
            // by using the spread operator, we return a *new* object, not a mutated one
            return { ...state, grid: [...state.grid, newRow] };
        case PICK_COLOR:
            return { ...state, selectedColor: action.color };
        case COLORIZE:
            const newGrid = [...state.grid];
            // newGrid[action.row] = [...newGrid[action.row]];
            newGrid[action.row][action.column] = state.selectedColor;
            return { ...state, grid: newGrid };
        case COLORIZE_BLOCK:
            let copyGrid = [...state.grid];

            const coloredGrid = copyGrid.map((row, rowIndex) => {
                if (rowIndex >= action.startRow && rowIndex <= action.endRow ) {
                    console.log('row isss', rowIndex)
                    return row.map((cell, cellIndex) => {
                        if (cellIndex >= action.startCol && cellIndex <= action.endCol ) {
                            console.log('col isss', cellIndex)
                            return cell = state.selectedColor;
                        }
                        return []
                    })
                }
                return row
            });
            console.log(coloredGrid);

            //Need algo for zipping 2 2D arrays so that way previous colors remain at same position.
            return {...state, grid: coloredGrid};
        default:
            return state;
    }
}

const store = createStore(
    reducer,
    applyMiddleware(loggerMiddleware)
)

export default store