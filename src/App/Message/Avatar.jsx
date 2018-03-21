import React, { Component } from 'react';

export default class Avatar extends Component {
    render() {
        return (
            <div style={ {backgroundImage: `url(${this.props.avatar})`} } className='t-avatar'>
            </div>
        )
    }
}