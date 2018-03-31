import React, { Component } from 'react';
import ImageUploadDialog from "./ImageUploadDialog";

export default class ImageUploadButton extends Component {
    state = {
        dialogOpen: false
    };

    imageSubmitHandler = imageData => {
        this.setState({
            dialogOpen: false
        });
    };

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