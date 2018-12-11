import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from '../custom/custom-redux';

// 1. Reducer
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1

    case 'DECREMENT': 
      return state - 1

    default:
      return state;
  }
}

// 2. Actions
const increment = {
  type: 'INCREMENT'
}
function decrease() {
  return { type: 'DECREMENT' }
}

// 3. Create Store
const store = createStore(counter)

// 4 Render
function render() {
  ReactDOM.render(
    <div>
      <h2>{store.getState()}</h2>
      <button onClick={() => store.dispatch(increment) }>+</button>
      <button onClick={() => store.dispatch(decrease()) }>-</button>
    </div>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)