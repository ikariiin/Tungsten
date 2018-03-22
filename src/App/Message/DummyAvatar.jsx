import React, { Component } from 'react';

export default class DummyAvatar extends Component {
    render() {
        // Don't judge me for that thing. pls.
        return (
            <div className='t-dummy-avatar' style={ { backgroundColor: `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, 0)}` } }>
            </div>
        );
    }
}