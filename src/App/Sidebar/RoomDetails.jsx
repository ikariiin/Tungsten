import React, { Component } from 'react';
import Window from "./Window";

export default class RoomDetails extends Component {
    render() {
        return (
            <div className='t-room-title'>{ document.querySelector('#roomname').textContent }</div>
        )
    }
}