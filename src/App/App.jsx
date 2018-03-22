import React, { Component } from 'react';
import MessageContainer from './Message/MessageContainer';
import Sidebar from "./Sidebar/Sidebar";
import MessageInput from "./Inputs/MessageInput";

class App extends Component {
    fkey = document.querySelector('#fkey').value;

    state = {
        roomid: Number(/\d+/.exec(window.location)[0])
    };
    render() {
        return (
            <div className='mounter'>
                <section className='t-message-system'>
                    <MessageContainer roomid={this.state.roomid} fkey={this.fkey} />
                    <MessageInput roomid={this.state.roomid} />
                </section>
                <Sidebar />
            </div>
        );
    }
}

export default App;