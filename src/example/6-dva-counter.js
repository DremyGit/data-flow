import React from 'react';
import dva, { connect } from 'dva';

// 1. Initialize
const app = dva();

// 2. Model
app.model({
  namespace: 'count',
  state: 0,
  reducers: {
    increase (state) {
      return state + 1
    },
    decrease(state) {
      return state - 1
    },
  },
  effects: {
    *increaseAsync(action, { call, put }) {
      yield call(sleep, 1000);
      yield put({ type: 'increase' })
    },
    *decreaseAsync(action, { call, put }) {
      yield call(sleep, 1000);
      yield put({ type: 'decrease' })
    }
  }
});

// 3. View
const Counter = connect(store => ({
  count: store.count
}))(
  ({ count, dispatch }) => (
    <div>
      <h2>{count}</h2>
      <button onClick={() => dispatch({type: 'count/increaseAsync'})}>+</button>
      <button onClick={() => dispatch({type: 'count/decreaseAsync'})}>-</button>
    </div>
  )
)

// 4. Router
app.router(() => <Counter />);

// 5. Start
app.start('#root');


function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time) 
  })
}