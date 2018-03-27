import React, { Component } from 'react';
import MessageContainer from './Message/MessageContainer';
import Sidebar from "./Sidebar/Sidebar";
import MessageInput from "./Inputs/MessageInput";
import Handlers from "./Message/Handlers";
import ChatWebSocketHijack from "../ChatWebSocketHijack";

class App extends Component {
    fkey = document.querySelector('#fkey').value;
    roomid = /\d+/.exec(window.location)[0];

    handlers = {
        onMessage: [],
        onUserJoin: [],
        onUserLeave: []
    };

    state = {
        roomid: Number(this.roomid),
        handler: new Handlers(this.handlers, this.roomid),
        websocketClient: new ChatWebSocketHijack(this.fkey)
    };

    pushOnMessage = handler => this.handlers.onMessage.push(handler);

    pushOnUserJoin = handler => this.handlers.onUserJoin.push(handler);

    pushOnUserLeave = handler => this.handlers.onUserLeave.push(handler);

    componentWillMount() {
        this.state.websocketClient.getWebSocketUri(this.roomid).then(res => res.json()).then(json => this.state.websocketClient.setWS(json, this.state.handler));
    }

    render() {
        return (
            <div className='mounter'>
                <section className='t-message-system'>
                    <MessageContainer roomid={this.state.roomid} fkey={this.fkey} pushMessageHandler={this.pushOnMessage} />
                    <MessageInput roomid={this.state.roomid} />
                </section>
                <Sidebar
                    pushUserJoinHandler={this.pushOnUserJoin}
                    pushUserLeaveHandler={this.pushOnUserLeave}
                />
            </div>
        );
    }
}

export default App;