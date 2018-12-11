
const INIT_ACTION = { type: '@INIT' };

/**
 * 创建 redux store
 * @param reducer 
 * @param initialState
 * @param enhancer
 */
const createStore = (reducer, initialState, enhancer) => {
  // 通过 store.subscribe 订阅的函数
  const subscribers = [];

  // 允许 initialState 为空
  if (typeof initialState === 'function') {
    enhancer = initialState;
    initialState = undefined;
  }

  // 通过初始化 action 获取初始 state
  let state = reducer(initialState, INIT_ACTION);

  // 如果存在 enhancer，则通过 enhancer 创建 store
  if (typeof enhancer === 'function') {
    // enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(enhancer)
    return enhancer(createStore)(reducer, initialState);
  }

  const store = {
    getState() {
      return state;
    },
    subscribe(func) {
      subscribers.push(func);
    },
    dispatch(action) {
      // 最终的 reducer 只支持纯对象，不允许其它类型
      // TODO: plain object check
      if (typeof action !== 'object') {
        throw new Error('action must be an plain object, but got ' + typeof action);
      }
      state = reducer(state, action);
      subscribers.forEach(func => func());
    }
  };

  return store;
}

/**
 * compose(f, g)(arg) -> f(g(arg))
 * @param  {...Function} funcs 
 */
const compose = (...funcs) => {
  if (funcs.length === 0) {
    return v => v;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

/**
 * 使用中间件
 * @param  {...Function} middlewares 
 */
const applyMiddleware = (...middlewares) => {
  return (createStore) => (reducer, initialState) => {
    const store = createStore(reducer, initialState);
    const chain = middlewares.map(middleware => middleware(store));
    store.dispatch = compose(...chain)(store.dispatch);
    return store;
  }
}

export {
  createStore,
  applyMiddleware,
  compose,
}