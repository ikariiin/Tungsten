import React, { Component } from 'react';
import {CircularProgress, MuiThemeProvider} from "material-ui";

export default class ImageOB extends Component {
    state = {
        backgroundLoaded: false,
        image: null
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

    render() {
        return (
            <MuiThemeProvider>
                <section className='t-posted-image'>
                    { this.state.backgroundLoaded
                        ? <div className='t-image' style={ {backgroundImage: `url(${this.state.image})`} }> </div>
                        : <div className='t-image-placeholder'> <CircularProgress size={40} thickness={2} /> </div>
                    }
                </section>
            </MuiThemeProvider>
        )
    }
}