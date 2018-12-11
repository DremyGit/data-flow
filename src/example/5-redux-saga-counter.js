import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from '../custom/custom-redux';
import { connect, Provider } from '../custom/custom-react-redux';
import createSagaMiddleware from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects'

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
function* increaseAsync() {
  yield call(sleep, 1000);
  yield put({ type: 'INCREMENT' })
}
function* decreaseAsync() {
  yield call( sleep, 1000);
  yield put({ type: 'DECREMENT' })
}
function* countSaga() {
  yield takeEvery('INCREASE_ASYNC', increaseAsync)
  yield takeEvery('DECREASE_ASYNC', decreaseAsync)
}

// 3. Create Store
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  counter,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(countSaga)

// 4. Component
const Counter = connect(store => ({
  count: store
}))(
  ({ count, dispatch }) => (
    <div>
      <h2>{count}</h2>
      <button onClick={() => dispatch({type: 'INCREASE_ASYNC'})}>+</button>
      <button onClick={() => dispatch({type: 'DECREASE_ASYNC'})}>-</button>
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