import React, { Component } from 'react';

export default class MutedText extends Component {
    render() {
        return (
            <section className='t-muted-text'>{ this.props.children }</section>
        )
    }
}