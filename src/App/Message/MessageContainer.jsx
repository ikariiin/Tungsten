import React, { Component } from 'react';
import ChatWebSocketHijack from '../../ChatWebSocketHijack';
import Handlers from './Handlers';
import Message from "./Message";

class MessageContainer extends Component {
    handlers = null;

    state = {
        websocketClient: (new ChatWebSocketHijack(document.querySelector('#fkey').value)),
        messages: [],
        lastMessageOwner: null
    };

    onOpen = (event) => {
        console.log(event);
    };

    onMessage = (message) => {
        console.log(this.state);
        if(message['userId'] === this.state.lastMessageOwner) {
            this.setState(prevState => {
                prevState.messages[prevState.messages.length - 1].messages.push(message.messages[0]);

                return {
                    messages: prevState.messages,
                    lastMessageOwner: message['userId'],
                    websocketClient: prevState.websocketClient
                };
            });
            return;
        }

        this.setState(prevState => {
            return {
                messages: [...prevState.messages, message],
                lastMessageOwner: message['userId'],
                websocketClient: prevState.websocketClient
            };
        });
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
            <section className='t-message-container'>
                { this.state.messages.map(message => {
                    console.log(message);
                    return <Message {...message} key={message.messages[0].key} />
                }) }
            </section>
        );
    }
}

export default MessageContainer;