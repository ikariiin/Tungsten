import React, { Component } from 'react';
import ContextMenu from "./ContextMenu";

export default class MessageContent extends Component {
    state = {
        details: null,
        showContext: false,
        contextPosition: {
            x: null,
            y: null
        },
        stars: null,
        selfStarred: null
    };

    componentWillMount() {
        this.state.details = this.props.details;
        this.state.stars = this.props.details.stars;
        this.state.selfStarred = this.props.details.selfStarred;
    }

    openContextMenu = ev => {
        ev.persist();
        ev.preventDefault();

        this.setState({
            showContext: true,
            contextPosition: {
                x: ev.screenX,
                y: ev.screenY
            }
        });
    };

    contextMenuClose = _ => {
        this.setState({
            showContext: false,
            contextPosition: null
        });
    };

    incrementStars = _ => {
        this.setState({
            stars: this.state.stars++
        });
        // Send star post request to server
    };

    render() {
        return (
            <div>
                <div className='t-content' onContextMenu={this.openContextMenu}>
                    { this.props.content }
                </div>
                {
                    this.state.showContext
                    && <ContextMenu
                        {...this.state.contextPosition}
                        handleClose={this.contextMenuClose}
                        modifyActionToPropagateToMessageView={this.props.modifyActionToPropagateToMessageView}
                        messageId={this.props.messageId}
                        incrementStars={this.incrementStars}
                    />
                }
            </div>
        )
    }
}