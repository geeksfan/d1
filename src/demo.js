import React from 'react';
import axios from 'axios';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date(), data: [] };
  }
  componentDidMount() {
    this.click();
  }
  click = () => {
    let that = this;
    axios
      .get('https://my-typescript-worker.17610588786.workers.dev/')
      .then(function (response) {
        if (response.status === 200) {
          console.log(response);
          that.setState({ data: [...response.data] });
        }
        // handle success
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  render() {
    const listItems =
      this.state.data.length > 0
        ? this.state.data.map((element) => (
            <div key={element.id}>
              <div>{element.id}</div>
              <div>{element.name}</div>
              <div>{element.age}</div>
            </div>
          ))
        : null;
    return (
      <div>
        <button onClick={this.click}>onClick</button>
        <div>{listItems}</div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default Clock;
