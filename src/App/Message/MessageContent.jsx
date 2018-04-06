import React, { Component } from 'react';

export default class MessageContent extends Component {
    state = {
        details: null
    };

    componentWillMount() {
        this.state.details = this.props.details;
    }

    render() {
        return (
            <div className='t-content'>
                { this.props.content }
            </div>
        )
    }
}