import React, { Component } from 'react';

export default class Room extends Component {
    state = {
        recentMessage: {
            user_name: "YoMom",
            message: "So fat..."
        },
        roomid: null
    };

    recentMessagesHandler = (message) => {
        message.forEach(event => {
            if(event.event_type === 1 && event.room_id === this.state.roomid) {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        recentMessage: {
                            user_name: event.user_name,
                            message: event.content
                        }
                    };
                });
            }
        });
    };

    componentWillMount() {
        this.props.pushOtherRoomsMessagesHandler(this.recentMessagesHandler);
        this.setState(prevState => {
            return {
                ...prevState,
                roomid: this.props.roomid
            };
        });
    }

    render() {
        return (
            <section className='t-room'>
                <section className='t-room-name'><a target='_self' href={`/rooms/${this.props.roomid}/${this.props.name}`}>{ this.props.name }</a></section>
                <section className='t-room-recent-message'>
                    <section className='t-user-name'>{ this.state.recentMessage.user_name }</section>
                    <section className='t-message-content' dangerouslySetInnerHTML={ {__html: this.state.recentMessage.message} }>
                    </section>
                </section>
            </section>
        )
    }
}