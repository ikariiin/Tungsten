import React, { Component } from 'react';
import Window from "./Window";
import GetUserDetails from "../../GetUserDetails";
import Room from "./Room";
import MutedText from "./MutedText";
import Handlers from "../Message/Handlers";

export default class UserPresence extends Component {
    state = {
        presence: []
    };

    fillUpInitialRooms(details) {
        this.setState(prevState => {
            return {
                presence: [...prevState.presence, ...details.rooms.map(room => room)]
            };
        });
    }

    // The arrow function takes care of the context for these handlers
    otherRoomEventHandler = event => {
        event.forEach(message => {
            if(message.event_type === Handlers.EVENT_ID_MAP.USER_JOIN && message.user_id === CHAT.CURRENT_USER_ID) {
                this.setState(prevState => {
                    return {
                        presence: [...prevState.presence, {
                            id: message.room_id,
                            name: message.room_name
                        }]
                    };
                });
            } else if(message.event_type === Handlers.EVENT_ID_MAP.USER_LEAVE && message.user_id === CHAT.CURRENT_USER_ID) {
                // This is probably pretty inefficient, we can probably improve it at some later point of time
                this.setState(prevState => {
                    prevState.presence.forEach((room, index) => {
                        if(room.id === message.room_id) {
                            prevState.presence.splice(index, 1);
                        }
                    });

                    return {
                        ...prevState,
                        presence: prevState.presence
                    };
                });
            }
        });
    }

    componentWillMount() {
        this.props.pushOtherRoomsMessagesHandler(this.otherRoomEventHandler);
        (new GetUserDetails(CHAT.CURRENT_USER_ID)).get().then(details => this.fillUpInitialRooms(details));
    }

    render() {
        return (
            <Window title='Presence' theme='#1de9b6' themeContrastText='#222222'>
                { (this.state.presence.length === 1)
                    ? <MutedText>No presence in other rooms, you little lonely guy</MutedText>
                    : this.state.presence.map((room, index) => {
                        if(room.id === CHAT.CURRENT_ROOM_ID) {
                            return;
                        }

                        return <Room name={room.name} key={index} roomid={room.id} pushOtherRoomsMessagesHandler={this.props.pushOtherRoomsMessagesHandler} />
                    }) }
            </Window>
        )
    }
}