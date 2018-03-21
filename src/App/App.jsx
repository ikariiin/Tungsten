import React, { Component } from 'react';
import MessageContainer from './Message/MessageContainer';

class App extends Component {
    render() {
        return (
            <div>
                <MessageContainer roomid={167147} />
            </div>
        );
    }
}

export default App;