import React, {Component} from 'react';
import GetUserDetails from "../../GetUserDetails";
import Avatar from "./Avatar";
import MessageContent from "./MessageContent";
import DummyAvatar from "./DummyAvatar";

class Message extends Component {
    userDetailGetter = null;
    state = {
        userDetails: null
    };

    static GRAVATAR_AVATAR_TEMPLATE = 'https://www.gravatar.com/avatar/{hash}?s=200&d=identicon&r=PG';

    componentWillMount() {
        this.userDetailGetter = new GetUserDetails(this.props.userId);
        this.userDetailGetter.get().then(details => this.setState({
            userDetails: details
        }));
    }

    static getAvatarUri(emailHash) {
        if(emailHash[0] !== '!') {
            // 'tis a gravatar my bois
            return Message.GRAVATAR_AVATAR_TEMPLATE.replace('{hash}', emailHash);
        } else {
            // good ol' imgur
            return emailHash.slice(1);
        }
    }

    render() {
        return (
            <section className='t-message'>
                {
                    (this.state.userDetails !== null)
                        ? <Avatar avatar={Message.getAvatarUri(this.state.userDetails['email_hash'])} details={this.state.userDetails} />
                        : <DummyAvatar />
                }
                <section className={ `t-messages-container ${(CHAT.CURRENT_USER_ID === this.props.userId) ? 't-current-user' : ''}` }>
                    { this.props.messages.map(message => {
                        return (
                            <MessageContent content={this.parse(message.content)} key={message.key} />
                        );
                    }) }
                </section>
            </section>
        );
    }

    parse(content) {
        if(typeof content === 'undefined') {
            return `<div class="t-message-removed">(its a gone)</div>`;
        }

        // const textContainer = document.createElement('div');
        // textContainer.innerHTML = content;
        // const text = textContainer.textContent;
        // NO BLOCKQUOTES, FUCK YOU.

        return content;
    }

}

export default Message;