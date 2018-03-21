import React, {Component} from 'react';

class Message extends Component {
    render() {
        return (
            <section className='message'>
                {this.props.messageContent}
            </section>
        );
    }
}

export default Message;