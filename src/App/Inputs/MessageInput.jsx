import React, { Component } from 'react';

export default class MessageInput extends Component {
    static MESSAGE_POST_URI = `${window.location.origin}/chats/{roomid}/messages/new`;

    fkey = document.querySelector('#fkey').value;

    sendMessage = message => {
        const trimmedMessage = message.trim();

        if(trimmedMessage.length === 0) return;

        const messageSendRequest = {
            credentials: "same-origin",
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
            body: `fkey=${this.fkey}&text=${trimmedMessage}`
        };

        fetch(MessageInput.MESSAGE_POST_URI.replace('{roomid}', this.props.roomid), messageSendRequest)
            .then(response => response.json())
            .then(timestamps => {
                if(timestamps.hasOwnProperty('id')) {
                    this.doSuccessThings();
                }
            });
    };

    doSuccessThings() {
        document.querySelector('#t-message-input').value = '';
    }

    inputKeyPressHandler = ev => {
        ev.persist();
        if(ev.keyCode === 13) {
            ev.preventDefault();
            this.sendMessage(ev.target.value);
        }
    };

    sendButtonClick = _ => this.sendMessage(document.querySelector('#t-message-input').value);

    render() {
        return (
            <section className='t-message-input-container'>
                <textarea className='t-message-input' id='t-message-input' onKeyDown={this.inputKeyPressHandler} placeholder='Type your message here...'>
                </textarea>
                <button className='t-message-send' onClick={this.sendButtonClick}>
                    <i className='material-icons'>send</i>
                </button>
            </section>
        );
    }
}