import React, { Component } from 'react';
import Window from "./Window";

export default class RoomDetails extends Component {
    render() {
        return (
            <Window customStyles={ {} } theme="#1d7791" themeContrastText='#FFF' title='Room Details'>
                <div className='t-room-title'>{ document.querySelector('#roomname').textContent }</div>
                <section className='t-room-desc' dangerouslySetInnerHTML={ {__html: document.querySelector('#roomdesc').innerHTML} }>
                </section>
            </Window>
        )
    }
}