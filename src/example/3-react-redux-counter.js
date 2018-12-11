import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { connect, Provider } from 'react-redux';

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

// 4. Component
const Counter = connect(store => ({
  count: store
}))(
  ({ count, dispatch }) => (
    <div>
      <h2>{count}</h2>
      <button onClick={() => dispatch(increment)}>+</button>
      <button onClick={() => dispatch(decrease())}>-</button>
    </div>
  )
)

// 5. Render
ReactDOM.render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById('root')
)