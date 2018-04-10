import React, { Component } from 'react';
import {CircularProgress, MuiThemeProvider} from "material-ui";
import ImagePreview from "./ImagePreview";

export default class ImageOB extends Component {
    state = {
        backgroundLoaded: false,
        image: null,
        openImagePreview: false
    };

    componentWillMount() {
        // Fetch doesn't work because of CORS
        // Cannot use DOM image api.
        // Everything is shite.
        // Fuck everything.

        this.setState({
            backgroundLoaded: true,
            image: this.props.src
        });
    }

    handleClick = ev => {
        this.setState({
            openImagePreview: true
        });
    };

    handleImageViewerClose = ev => {
        ev.preventDefault();

        this.setState({
            openImagePreview: false
        });
    };

    render() {
        return (
            <MuiThemeProvider>
                <section className='t-posted-image' onClick={this.handleClick}>
                    {
                        this.state.openImagePreview
                            ? <ImagePreview {...this.props} close={this.handleImageViewerClose} />
                            : null
                    }
                    { this.state.backgroundLoaded
                        ? <div className='t-image' style={ {backgroundImage: `url(${this.state.image})`} }> </div>
                        : <div className='t-image-placeholder'> <CircularProgress size={40} thickness={2} /> </div>
                    }
                </section>
            </MuiThemeProvider>
        )
    }
}