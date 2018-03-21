import React, {Component} from 'react';
import GetUserDetails from "../../GetUserDetails";
import Avatar from "./Avatar";
import MessageContent from "./MessageContent";

class Message extends Component {
    userDetailGetter = null;
    state = {
        userDetails: null
    };

    componentWillMount() {
        this.userDetailGetter = new GetUserDetails(this.props.userId);
        this.userDetailGetter.get().then(details => this.setState({
            userDetails: details
        }));
    }

    render() {
        return (
            <section className='t-message'>
                { (this.state.userDetails !== null) ? <Avatar avatar={this.state.userDetails['email_hash'].slice(1)} details={this.state.userDetails} /> : '' }
                <section className='t-messages-container'>
                    { this.props.messages.map(message => {
                        return (
                            <MessageContent content={message.content} key={message.key} />
                        );
                    }) }
                </section>
            </section>
        );
    }
}

export default Message;