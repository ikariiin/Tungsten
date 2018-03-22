import React, { Component } from 'react';
import MessageContainer from './Message/MessageContainer';
import Sidebar from "./Sidebar/Sidebar";

class App extends Component {
    render() {
        return (
            <div>
                <MessageContainer roomid={Number(/\d+/.exec(window.location)[0])} />
                <Sidebar />
            </div>
        );
    }
}

export default App;