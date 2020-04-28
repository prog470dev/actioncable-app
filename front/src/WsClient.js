import React from "react";
import Actioncable from "actioncable";

class WsClient extends React.Component {
  constructor(props) {
    super(props);

    // TODO: channelをインスタンスのフィールドとして持つのは適切か？
    this.id = Math.floor(Math.random() * 999);
    this.endpoint = "ws:localhost:3000/cable";
    this.cable = Actioncable.createConsumer(this.endpoint);

    this.chatChannel = this.cable.subscriptions.create(
      {
        channel: "ChatChannel",
      },
      {
        connected: () => {
          console.log("connected.");
        },
        received: (data) => {
          console.log(data);
          this.setState({
            messages: [...this.state.messages, data],
          });
        },
      }
    );

    this.notificationChannel = this.cable.subscriptions.create(
      {
        channel: "NotificationChannel",
        id: this.id,
      },
      {
        connected: () => {
          console.log("connected.");
        },
        received: (data) => {
          console.log(data);
        },
      }
    );

    this.state = {
      messages: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClickCount = this.handleClickCount.bind(this);
  }

  handleClick() {
    this.chatChannel.perform("speak", {
      text: "hoge",
    });
  }

  handleClickCount() {
    const url = "http://localhost:3000/counts";
    const data = { count: Math.floor(Math.random() * 10), id: this.id };

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  render() {
    const items = this.state.messages.map((message) => {
      return <li>message</li>;
    });
    return (
      <div>
        <button onClick={this.handleClickCount}>count</button>
        <button onClick={this.handleClick}>connect!</button>
        <ul>{items}</ul>
      </div>
    );
  }
}

export default WsClient;
