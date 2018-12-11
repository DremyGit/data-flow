import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { connect, Provider } from 'react-redux';

// 0. Middlewares
const thunkMiddleware = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState)
  }
  return next(action)
}
const promiseMiddleware = store => next => action => {
  if (typeof action.then === 'function') {
    return Promise.resolve(action).then(store.dispatch)
  }
  return next(action)
}

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
function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time) 
  })
}
function increaseAsync(time) {
  return dispatch => {
    sleep(1000).then(() => {
      dispatch({ type: 'INCREMENT' })
    })
  }
}
async function decreaseAsync() {
  await sleep(1000);
  return { type: 'DECREMENT' }
}

// 3. Create Store
const store = createStore(
  counter,
  applyMiddleware(
    promiseMiddleware,
    thunkMiddleware
  )
)

// 4. Component
const Counter = connect(store => ({
  count: store
}))(
  ({ count, dispatch }) => (
    <div>
      <h2>{count}</h2>
      <button onClick={() => dispatch(increaseAsync())}>+</button>
      <button onClick={() => dispatch(decreaseAsync())}>-</button>
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