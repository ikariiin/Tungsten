import React, { Component } from 'react';
import MessageContainer from './Message/MessageContainer';

class App extends Component {
    render() {
        return (
            <div>
                <MessageContainer roomid={Number(/\d+/.exec(window.location)[0])} />
            </div>
        );
    }
}

export default App;