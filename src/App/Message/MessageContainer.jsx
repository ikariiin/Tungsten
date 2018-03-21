import React, { Component } from 'react';
import ChatWebSocketHijack from '../../ChatWebSocketHijack';
import Handlers from './Handlers';
import Message from "./Message";

class MessageContainer extends Component {
    handlers = null;

    onOpen = (event) => {
        console.log(event);
    };

    onMessage = (message) => {
        this.setState(prevState => {
            prevState.messageComponents.push(
                <Message messageContent={message.content}/>
            );
            return {...prevState};
        });
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
        this.handlers = new Handlers(this, this.props.roomid);
        this.state.websocketClient.getWebSocketUri(this.props.roomid).then(res => res.json()).then(json => this.state.websocketClient.setWS(json, this.handlers));
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