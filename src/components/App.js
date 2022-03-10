import React, { Component } from 'react';
import store, {addRow, pickColor, colorize} from '../store';
import Table from './Table';

class App extends Component{
    constructor(){
        super();
        this.state = store.getState();
    }

    componentDidMount() {
        //when the component mounts, subscribe to further updates from the store and update component state.
        store.subscribe(()=> {
            this.setState(store.getState())
        })
        // unsubscribe from the store when the component unmounts.
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
    }

    // If App component is going to unmount, do this:
    componentWillUnmount() {
        this.unsubscribe()
    }

    handleAddRow(){
        store.dispatch(addRow());
    }

    handleColorChange(event) {
        store.dispatch(pickColor(event.target.value));
    }

    handleClick(e){
        const col = e.target.cellIndex;
        const row = e.target.parentNode.rowIndex;
        
        const target = e.target
        if (target.className === (store.getState()).selectedColor) {
            target.className = ''
        } else {
            store.dispatch(colorize(row, col))
        }
    }

    handleMouseDown(e){
        console.log('mouse down eventtttttt', e)
    }

    // function addMouseOver () {
//   table.addEventListener('mouseover', colorize)
// }

// function removeMouseOver () {
//   table.removeEventListener('mouseover', colorize)
// }

    render(){
        const {grid} = this.state;
        return (
            <div>
                <h1>Pixelate</h1>
                <div>
                    <button id='add-row' onClick={this.handleAddRow}>Add a row</button>
                    <select onChange={(e)=> this.handleColorChange(e)}>
                        <option value="red">Red</option>
                        <option value="orange">Orange</option>
                        <option value="yellow">Yellow</option>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                        <option value="indigo">Indigo</option>
                        <option value="violet">Violet</option>
                        <option value="black">Black</option>
                        <option value="white">White</option>
                        <option value="brown">Brown</option>
                    </select>
                </div>
                <Table grid={ grid } handleClick={this.handleClick} />
            </div>
        )
    }
}

export default App;