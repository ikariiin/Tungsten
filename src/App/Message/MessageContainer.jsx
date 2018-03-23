import React, { Component } from 'react';
import ChatWebSocketHijack from '../../ChatWebSocketHijack';
import Handlers from './Handlers';
import Message from "./Message";
import PassiveRoomMessage from "./PassiveRoomMessage";

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
        this.loadAllTranscript();
        this.handlers = new Handlers(this, this.props.roomid);
        this.state.websocketClient.getWebSocketUri(this.props.roomid).then(res => res.json()).then(json => this.state.websocketClient.setWS(json, this.handlers));
    }

    render() {
        return (
            <section className='t-message-container'>
                {
                    (this.state.messages.length !== 0)
                        ? this.state.messages.map((message, index) => {
                            if(index === this.state.messages.length - 1) {
                                console.log('last');
                                this.applyScrollLogic();
                            }
                            return <Message {...message} key={message.messages[0].key} />
                        })
                        : <PassiveRoomMessage message='No messages in this room yet.' />
                }
            </section>
        );
    }

    applyScrollLogic() {
        const container = document.querySelector('.t-message-container');
        if(container.scrollTop <= container.scrollHeight - 30 || container.scrollTop >= container.scrollHeight + 30) {
            // TODO: Find a better fix for this case
            setTimeout(_ => container.scrollTop = container.scrollHeight, 2);
        }
    }

    loadAllTranscript() {
        fetch(`${window.location.origin}/chats/${this.props.roomid}/events`, {
            credentials: "same-origin",
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
            body: `fkey=${this.props.fkey}&mode=Messages&msgCount=100&since=0`
        })
            .then(res => res.json())
            .then(json => {
                json.events.forEach(message => {
                    this.onMessage({
                        type: 'message',
                        messages: [{
                            content: message['content'],
                            key: message['message_id'],
                            timestamp: message['time_stamp']
                        }],
                        userId: message['user_id'],
                        userName: message['user_name']
                    });
                });
                const container = document.querySelector('.t-message-container');
                container.scrollTop = container.scrollHeight
            });
    }
}

export default MessageContainer;