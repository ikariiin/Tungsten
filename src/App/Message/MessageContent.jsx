import React, { Component } from 'react';
import ContextMenu from "./ContextMenu";

export default class MessageContent extends Component {
    state = {
        details: null,
        showContext: false,
        contextPosition: {
            x: null,
            y: null
        }
    };

    componentWillMount() {
        this.state.details = this.props.details;
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
                    />
                }
            </div>
        )
    }
}