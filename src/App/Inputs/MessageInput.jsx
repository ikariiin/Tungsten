import React, { Component } from 'react';
import CodeEditorDialog from "./CodeEditorDialog";
import ImageUploadButton from "./ImageUploadButton";

export default class MessageInput extends Component {
    static MESSAGE_POST_URI = `${window.location.origin}/chats/{roomid}/messages/new`;

    fkey = document.querySelector('#fkey').value;

    state = {
        openCodeEditorDialog: false,
        message: ``
    };

    textInput = null;

    componentWillMount() {
        this.props.pushActionPropagationHandler(this.actionPropagationHandler);
    }

    setTextInput = element => this.textInput = element;

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
                    this.doSuccessThings();
                }
            });
    };

    actionPropagationHandler = action => {
        this.setState({
            message: `${action.content}${this.state.message}`
        });
        this.textInput.focus();
    };

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

    handleEnterPress = (ev) => {
        if(!ev.shiftKey) {
            ev.preventDefault();
            this.sendMessage(this.state.message);
        }
    };

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
            this.sendMessage(paddedString, false);
        }
    };

    handleInputChange = ev => {
        this.setState({
            message: ev.target.value
        });
    };

    doSuccessThings() {
        this.setState({
            message: ``
        });
    }

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
                    value={ this.state.message }
                    onChange={ this.handleInputChange }
                    ref={this.setTextInput}
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