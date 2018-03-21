import React, { Component } from 'react';
import ChatWebSocketHijack from '../../ChatWebSocketHijack';
import Handlers from './Handlers';
import Message from "./Message";

class MessageContainer extends Component {
    handlers = new Handlers(this);

    onOpen = (event) => {
        console.log(event);
    };

    onMessage = (event, data) => {
        const primaryMessage = Handlers.defaultPrimaryEventDataParser(this.props.roomid, event);
    };

    state = {
        websocketClient: (new ChatWebSocketHijack(document.querySelector('#fkey').value)),
        rawMessage: [],
        messageComponents: []
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.state.websocketClient.getWebSocketUri().then(res => res.json()).then(json => this.state.websocketClient.setWS(json, this.handlers));
    }

    render() {
        return (
            <section className='message-container'>
                { this.state.messageComponents }
            </section>
        );
    }
}

export default MessageContainer;