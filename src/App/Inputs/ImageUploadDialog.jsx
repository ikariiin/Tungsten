import React, { Component } from 'react';
import {MuiThemeProvider} from "material-ui";
import DropZoneModal from 'material-ui-dropzone';

export default class ImageUploadDialog extends Component {
    state = {
        open: true,
        image: []
    };

    saveFiles = files => {};

    cancelUpload = ev => {};

    render() {
        return (
            <MuiThemeProvider>
                <DropZoneModal
                    open={this.state.open}
                    saveFiles={this.saveFiles}
                    acceptedFiles={['image/jpeg', 'image/png']}
                    files={this.state.image}
                    showPreviews={true}
                    maxSize={5000000}
                    closeDialog={this.cancelUpload}
                />
            </MuiThemeProvider>
        )
    }
}