import React, { Component } from 'react';
import {Divider, Menu, MenuItem, MuiThemeProvider, Paper} from "material-ui";
import ContentLink from 'material-ui/svg-icons/content/link';
import Reply from 'material-ui/svg-icons/content/reply';
import Star from 'material-ui/svg-icons/toggle/star';
import CopyToClipBoard from "../../Utils/CopyToClipBoard";

export default class ContextMenu extends Component {
    // In case you are wondering why a trivial function like this is a named one,
    // it's because you need to have same function signatures for TargetEvent.addEventListener
    // and TargetEvent.removeEventListener
    closeContextMenu = ev => this.props.handleClose(ev);

    componentDidMount() {
        // Close all other context menus first tho.
        // Also, I'm a genius.
        document.addEventListener('contextmenu', this.closeContextMenu);
        document.addEventListener('click', ev => {
            this.props.handleClose(ev);
        });
    }

    componentWillUnmount() {
        document.removeEventListener('contextmenu', this.closeContextMenu);
    }

    static transcriptUri = `${window.location.origin}/transcript/message/`;

    reply = ev => {
        this.props.modifyActionToPropagateToMessageView({
            content: `:${this.props.messageId} `
        });
    };

    copyPermalink = ev => {
        CopyToClipBoard.copyTextToClipboard(`${ContextMenu.transcriptUri}${this.props.messageId}#${this.props.messageId}`)
    };

    starMessage = ev => {
        const messageId = this.props.messageId;

        fetch(`${window.location.origin}/messages/${messageId}/star`)
            .then(response => response.text())
            .then(text => {
                if(text === "ok") {
                    this.props.incrementStars();
                }
            });
    };

    render() {
        return (
            <MuiThemeProvider>
                <section className='t-context-menu' style={
                    {
                        top: `${this.props.y - 70}px`,
                        left: `${this.props.x}px`,
                        display: 'block'
                    }
                }>
                    <Paper zDepth={4}>
                        <Menu desktop={true} onEscKeyDown={this.props.handleClose}>
                            <MenuItem primaryText="Reply to this message" leftIcon={<Reply />} onClick={this.reply} />
                            <MenuItem primaryText="Star this message as interesting" leftIcon={<Star />} onClick={this.starMessage} />
                            <Divider />
                            <MenuItem primaryText="Copy permalink to clipboard" leftIcon={<ContentLink />} onClick={this.copyPermalink} />
                        </Menu>
                    </Paper>
                </section>
            </MuiThemeProvider>
        )
    }
}