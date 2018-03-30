import React, { Component } from 'react';
import ImageUploadDialog from "./ImageUploadDialog";

export default class ImageUploadButton extends Component {
    state = {
        dialogOpen: false
    };

    imageSubmitHandler = imageData => {};

    render() {
        return (
            <section className='t-image-upload-button-container'>
                {
                    this.state.dialogOpen
                    ? <ImageUploadDialog imageSubmitHandler={this.imageSubmitHandler} />
                    : null
                }
                <button className='t-image-upload-button'>
                    <i className='material-icons'>photo</i>
                </button>
            </section>
        )
    }
}