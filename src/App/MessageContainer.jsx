import React, { Component } from 'react';
import DOMObserver from "../DOMObserver";

class MessageContainer extends Component {
    parser = (node) => {
        if( node.classList && node.classList.contains('message') ) {
            this.setState(prevState => {
                console.log(prevState);

                prevState.rawMessage.push({
                    content: node.querySelector('.content').innerHTML
                });

                return {
                    observer: prevState.observer,
                    messageComponents: prevState.messageComponents,
                    rawMessage: prevState.rawMessage
                };
            });
        }
    };


    state = {
        observer: (new DOMObserver()).addParser(this.parser, '.user-container .message'),
        rawMessage: [],
        messageComponents: []
    };

    constructor(props) {
        super(props);
    }

    render() {
        this.state.observer.drain();
        return (
            <pre className='message-container'>
                { JSON.stringify(this.state.rawMessage) }
            </pre>
        );
    }
}

export default MessageContainer;