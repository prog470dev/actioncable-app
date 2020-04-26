import React from "react";
import Actioncable from "actioncable";

class WsClient extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            messages: [],
        };

        // TODO: ここでコネクションの初期化は適切ではないが、this.channelへの参照をどのように持つべきか？
        this.endpoint = "ws:localhost:3000/cable";
        this.cable = Actioncable.createConsumer(this.endpoint);
        this.channel = this.cable.subscriptions.create(
          {
            channel: "ChatChannel",
            id: 99,
          },
          {
            connected: () => {
              console.log("connected.");
            },
            received: (data) => {
              this.setState({
                  messages: [...this.state.messages, data]
              })
            },
          }
        );

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.channel.perform("speak", {
          data1: "hoge",
          id: 99,  // 99のときのみブロードキャスト
        });
    }

    render(){
        const items = this.state.messages.map((message)=>{
            return <li>message</li>;
        });
        return (
            <div>
                <button onClick={this.handleClick}>
                    connect!
                </button>
                <ul>
                    {items}
                </ul>
            </div>
        );
    }
}

export default WsClient;