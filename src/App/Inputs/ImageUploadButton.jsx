import React, { Component } from 'react';
import ImageUploadDialog from "./ImageUploadDialog";
import ImageUploader from "./ImageUploader";
import MessageInput from "./MessageInput";

export default class ImageUploadButton extends Component {
    state = {
        dialogOpen: false
    };

    imageSubmitHandler = (imagesData, callAtEnd) => {
        const uploader = new ImageUploader(this.props.fkey, imagesData);

        uploader.startUploading().forEach(request => request.then(
            response => this.handleResponse(response, callAtEnd)
        ));
    };

    async handleResponse(response, callAtEnd) {
        const text = await response.text();

        const re = /result = '([^']*)';/;
        const [, src] = text.match(re);

        this.postMessage(src);

        callAtEnd();

        this.setState({
            dialogOpen: false
        });
    }

    dialogCancelled = _ => {
        this.setState({
            dialogOpen: false
        })
    };

    handleButtonClick = ev => {
        this.setState({
            dialogOpen: true
        });
    };

    postMessage(src) {
        setTimeout(_ => {
            const messageSendRequest = {
                credentials: "same-origin",
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
                body: `fkey=${this.props.fkey}&text=${encodeURIComponent(src)}%23.png`
            };

            fetch(MessageInput.MESSAGE_POST_URI.replace('{roomid}', this.props.roomid), messageSendRequest);
        }, 500);
    }

    render() {
        return (
            <section className='t-image-upload-button-container'>
                {
                    this.state.dialogOpen
                    ? <ImageUploadDialog imageSubmitHandler={this.imageSubmitHandler} dialogCancelled={this.dialogCancelled} />
                    : null
                }
                <button className='t-image-upload-button' onClick={this.handleButtonClick}>
                    <i className='material-icons'>photo</i>
                </button>
            </section>
        )
    }
};