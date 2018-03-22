import React, { Component } from 'react';

export default class PassiveRoomMessage extends Component {
    render() {
        return (
            <section className='t-passive-room-message'>
                {this.props.message}
            </section>
        )
    }
}