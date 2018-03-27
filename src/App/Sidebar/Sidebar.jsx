import React, { Component } from 'react';
import RoomDetails from "./RoomDetails";
import UserPresence from "./UserPresence";

export default class Sidebar extends Component {
    render() {
        return (
            <section className='t-sidebar'>
                <RoomDetails />
                <UserPresence
                    {...this.props}
                />
            </section>
        );
    }
}