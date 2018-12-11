import React from 'react';
import ReactDOM from 'react-dom';

class Counter extends React.Component {

  state = {
    count: 0
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <h2>{count}</h2>
        <button onClick={() => this.setState({ count: this.state.count + 1}) }>+</button>
        <button onClick={() => this.setState({ count: this.state.count - 1}) }>-</button>
      </div>
    )
  }
}
  
ReactDOM.render(<Counter />, document.getElementById('root'))
