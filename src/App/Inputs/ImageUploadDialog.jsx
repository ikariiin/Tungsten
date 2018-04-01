import React, { Component } from 'react';
import {CircularProgress, Dialog, FlatButton, MuiThemeProvider} from "material-ui";
import Dropzone from "react-dropzone";

export default class ImageUploadDialog extends Component {
    actions = [];

    state = {
        open: true,
        images: [],
        uploading: false
    };

    handleClose = ev => {
        this.setState({
            open: false
        });
        setTimeout(_ => this.props.dialogCancelled(), 600);
    };

    handleSubmit = ev => {
        const callAtEnd = _ => this.setState({
            open: false
        });
        this.setState({
            uploading: true
        });
        this.props.imageSubmitHandler(this.state.images, callAtEnd);
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

    handleRequestClose = () => {
        if(!this.state.uploading) {
            this.handleClose();
        } else {
            return false;
        }
    };

    render() {
        return (
            <MuiThemeProvider>
                <Dialog
                    title="Upload Images"
                    actions={this.actions}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    {
                        this.state.uploading
                            ? <div className='t-uploading-progress'>
                                <section style={ {textAlign: "center"} }>
                                    <CircularProgress size={60} thickness={7} />
                                    <br />
                                    Uploading...
                                </section>
                            </div>
                            : <Dropzone
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
                                                        <div className='material-icons t-upload-icon'>done</div>
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
                                                            <div className='material-icons t-upload-icon'>close</div>
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
                                                            this.state.images.concat({placeholder: true}).map((image, index) =>
                                                                {
                                                                    if(typeof image === "undefined") {
                                                                        return;
                                                                    }

                                                                    if(image.placeholder) {
                                                                        return (
                                                                            <div
                                                                                key={index}
                                                                                className='t-image-placeholder'
                                                                            >
                                                                                <section>
                                                                                    <i className='material-icons t-add-icon'>add</i>
                                                                                </section>
                                                                                Add more pictures by dropping or clicking here
                                                                            </div>
                                                                        )
                                                                    }
                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            className='t-preview-image'
                                                                            style={
                                                                                {
                                                                                    backgroundImage: `url(${image[0].preview})`
                                                                                }
                                                                            }
                                                                            onClick={this.preventPropagation}
                                                                        >
                                                                            <div className='t-dump-icon'>
                                                                                <i className='material-icons' onClick={ev => this.removeImage(index, ev)}>delete</i>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                            )
                                                        }
                                                    </section>
                                                </section>
                                            )
                                            : (
                                                <section className='t-dropzone-inside-text'>
                                                    <section>
                                                        <div className='material-icons t-upload-icon'>file_upload</div>
                                                        Click here, or drop your images here to upload
                                                    </section>
                                                </section>
                                            )
                                    }
                                }
                            </Dropzone>
                    }
                </Dialog>
            </MuiThemeProvider>
        )
    }

    removeImage(index, event) {
        event.persist();
        event.preventDefault();
        event.stopPropagation();

        this.setState(prevState => {
            const images = [...prevState.images];
            delete images[index];

            return {
                ...prevState,
                images: images
            };
        });
    }

    preventPropagation = ev => {
        ev.persist();
        ev.stopPropagation();
    }
}