import React, {Component} from 'react';

class Message extends Component {
    render() {
        return (
            <section className='message'>
                <div dangerouslySetInnerHTML={ {__html: this.props.messageContent} }>
                </div>
            </section>
        );
    }
}

export default Message;