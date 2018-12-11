import React from 'react';

const context = React.createContext();

const connect = (mapStateToProps) => (WrappedComponent) => {
  return function Connect() {
    return (
      <context.Consumer>
        {({ store }) => {
          const state = store && store.getState();
          let props = {};
          if (typeof mapStateToProps === 'function') {
            props = mapStateToProps(state);
          }
          return (
            <WrappedComponent {...props} dispatch={store.dispatch} />
          )
        }}
      </context.Consumer>
    )
  }
}

class Provider extends React.Component {

  constructor(props) {
    super(props);
    const { store } = props;
    store.subscribe(this.forceUpdate.bind(this));
  }

  render() {
    const { store, children } = this.props;
    return (
      <context.Provider value={{ store }}>
        {children}
      </context.Provider>
    );
  }
}

export {
  connect,
  Provider,
}