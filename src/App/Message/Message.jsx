import React, {Component} from 'react';
import GetUserDetails from "../../GetUserDetails";
import Avatar from "./Avatar";
import MessageContent from "./MessageContent";
import DummyAvatar from "./DummyAvatar";
import Highlight from 'react-highlight';
import ImageOB from "./OneBoxes/ImageOB";

class Message extends Component {
    userDetailGetter = null;
    state = {
        userDetails: null
    };

    static GRAVATAR_AVATAR_TEMPLATE = 'https://www.gravatar.com/avatar/{hash}?s=128&d=identicon&r=PG';

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
                            <MessageContent content={this.parse(message.content, message)} key={message.key} />
                        );
                    }) }
                </section>
            </section>
        );
    }

    parse(content, message) {
        if(typeof content === 'undefined') {
            return <div className="t-message-removed">(its a gone)</div>;
        }

        // const textContainer = document.createElement('div');
        // textContainer.innerHTML = content;
        // const text = textContainer.textContent;
        // NO BLOCKQUOTES, FUCK YOU.

        const placeholder = document.createElement('div');
        placeholder.innerHTML = content;

        if(placeholder.querySelector('pre') !== null) {
            const code = placeholder.querySelector("pre").textContent;
            return (
                <Highlight>
                    { code }
                </Highlight>
            );
        }

        if(placeholder.querySelector('img') !== null) {
            const imgSrc = placeholder.querySelector('img').src;
            return (
                <ImageOB src={imgSrc} data={ {messageData: message, userData: this.state.userDetails} } />
            )
        }

        return (
            <div dangerouslySetInnerHTML={ {__html: content} }>
            </div>
        );
    }

}

export default Message;