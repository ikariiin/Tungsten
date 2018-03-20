import React, { Component } from 'react';
import DOMObserver from "../DOMObserver";

class MessageContainer extends Component {
    parser = (node) => {
        if( node.classList && node.classList.contains('message') && !node.classList.contains('pending') ) {
            this.setState(prevState => {
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

    componentWillMount() {
        this.state.observer.drain();
    }

    render() {
        return (
            <pre className='message-container'>
                { JSON.stringify(this.state.rawMessage) }
            </pre>
        );
    }
}

export default MessageContainer;