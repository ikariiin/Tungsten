import React, { Component } from 'react';
import {Dialog, FlatButton, MuiThemeProvider} from "material-ui";
import Dropzone from "react-dropzone";

export default class ImageUploadDialog extends Component {
    actions = [];

    state = {
        open: true,
        images: []
    };

    handleClose = ev => {
        this.setState({
            open: false
        });
        setTimeout(_ => this.props.dialogCancelled(), 600);
    };

    handleSubmit = ev => {
        this.setState({
            open: false
        });
        setTimeout(_ => this.props.imageSubmitHandler(this.state.images), 600);
    };

    addImage = image => {
        this.setState({
            images: [...this.state.images, image]
        });
    };

    componentWillMount() {
        this.actions = [
            <FlatButton
                label='Cancel'
                primary={false}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Upload"
                primary={true}
                onClick={this.handleSubmit}
            />
        ];
    }

    render() {
        return (
            <MuiThemeProvider>
                <Dialog
                    title="Upload Images"
                    actions={this.actions}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <Dropzone
                        className='t-dropzone-modal'
                        onDrop={this.addImage}
                        accept="image/jpeg, image/png"
                    >
                        {
                            ( {isDragActive, isDragReject, acceptedFiles, rejectedFiles} ) => {
                                if(isDragActive) {
                                    return (
                                        <section className='t-dropzone-inside-text t-active'>
                                            <section>
                                                <div className='material-icons t-upload-icon'>file_upload</div>
                                                Release mouse to start upload
                                            </section>
                                        </section>
                                    );
                                }
                                if(isDragReject) {
                                    return (
                                        <section className='t-dropzone-inside-text t-reject'>
                                            <section>
                                                <section>
                                                    <div className='material-icons t-upload-icon'>file_upload</div>
                                                </section>
                                                Unsupported image type
                                            </section>
                                        </section>
                                    );
                                }
                                return acceptedFiles.length
                                    ? (
                                        <section className='t-dropzone-inside-text t-accepted'>
                                            <section className='t-preview-grid-container'>
                                                {
                                                    this.state.images.map((image, index) => (<div
                                                            key={index}
                                                            className='t-preview-image'
                                                            style={
                                                                {
                                                                    backgroundImage: `url(${image[0].preview})`
                                                                }
                                                            }
                                                        > </div>)
                                                    )
                                                }
                                            </section>
                                        </section>
                                    )
                                    : (
                                        <section className='t-dropzone-inside-text'>
                                            <section>
                                                <div className='material-icons t-upload-icon'>file_upload</div>
                                                Drop your images here
                                            </section>
                                        </section>
                                    )
                            }
                        }
                    </Dropzone>
                </Dialog>
            </MuiThemeProvider>
        )
    }
}