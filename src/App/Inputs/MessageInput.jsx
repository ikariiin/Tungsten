import React, { Component } from 'react';
import CodeEditorDialog from "./CodeEditorDialog";
import ImageUploadButton from "./ImageUploadButton";

export default class MessageInput extends Component {
    static MESSAGE_POST_URI = `${window.location.origin}/chats/{roomid}/messages/new`;

    fkey = document.querySelector('#fkey').value;

    state = {
        openCodeEditorDialog: false
    };

    sendMessage = (message, toTrim = true) => {
        // On, second thoughts, fu.
        const trimmedMessage = toTrim ? message.trim() : message;

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
                    MessageInput.doSuccessThings();
                }
            });
    };

    static doSuccessThings() {
        // I'm sorry :(
        // TODO: Probably improve this in the future? :/
        document.querySelector('#t-message-input').value = '';
    }

    inputKeyPressHandler = ev => {
        ev.persist();
        // 'enter'
        if(ev.keyCode === 13) {
            this.handleEnterPress(ev);
        }
        // 'K'
        if(ev.keyCode === 75) {
            this.handlePossibleCodeEditorEvent(ev);
        }
    };

    handleEnterPress(ev) {
        if(!ev.shiftKey) {
            ev.preventDefault();
            this.sendMessage(ev.target.value);
        }
    }

    handlePossibleCodeEditorEvent(ev) {
        if(!ev.ctrlKey) {
            return;
        }

        ev.preventDefault();
        this.setState(
            prevState => ({
                ...prevState,
                openCodeEditorDialog: true
            })
        );
    }

    handleDialogClose = ev => {
        this.setState(prevState => ({
            ...prevState,
            openCodeEditorDialog: false
        }));
    };

    handleEditorCompletion = code => {
        this.setState(prevState => ({
            ...prevState,
            openCodeEditorDialog: false
        }));

        if(code.value.length !== 0) {
            const paddedString = MessageInput.leftPadCodeForMarkDown(code.value);
            console.log(paddedString);
            this.sendMessage(paddedString, false);
        }
    };

    sendButtonClick = _ => this.sendMessage(document.querySelector('#t-message-input').value);

    render() {
        return (
            <section className='t-message-input-container'>
                { this.state.openCodeEditorDialog
                    ? <CodeEditorDialog
                        handleDialogClose={this.handleDialogClose}
                        handleEditorCompletion={this.handleEditorCompletion}
                    />
                    : null }
                <ImageUploadButton fkey={this.props.fkey} roomid={this.props.roomid} />
                <textarea
                    className='t-message-input'
                    id='t-message-input'
                    onKeyDown={this.inputKeyPressHandler}
                    placeholder='Type your message here...'
                >
                </textarea>
                <button className='t-message-send' onClick={this.sendButtonClick}>
                    <i className='material-icons'>send</i>
                </button>
            </section>
        );
    }

    static leftPadCodeForMarkDown(code, delimiter = "\n") {
        const lines = code.split(delimiter);
        const paddedLines = [];

        lines.forEach(line => paddedLines.push(`    ${line}`));

        return paddedLines.join(delimiter);
    }
};