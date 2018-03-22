import React, { Component } from 'react';
import RoomDetails from "./RoomDetails";

export default class Sidebar extends Component {
    render() {
        return (
            <section className='t-sidebar'>
                <RoomDetails />
            </section>
        );
    }
}