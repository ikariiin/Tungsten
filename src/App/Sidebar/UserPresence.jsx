import React, { Component } from 'react';
import Window from "./Window";
import GetUserDetails from "../../GetUserDetails";

export default class UserPresence extends Component {
    state = {
        presence: []
    };

    joinHandler = data => {
        console.log(data);
    };

    leaveHandler = data => {
        console.log(data);
    };

    fillUpInitialRooms(details) {
        this.setState(prevState => {
            return {
                presence: [...prevState.presence, details.rooms.map(room => room)]
            };
        });
    }

    componentWillMount() {
        this.props.pushUserJoinHandler(this.joinHandler);
        this.props.pushUserLeaveHandler(this.leaveHandler);
        (new GetUserDetails(CHAT.CURRENT_USER_ID)).get().then(details => this.fillUpInitialRooms(details));
    }

    render() {
        return (
            <Window title='Presence' theme='#ff7043' themeContrastText='#222222'>
                { JSON.stringify(this.state.presence) }
            </Window>
        )
    }
}