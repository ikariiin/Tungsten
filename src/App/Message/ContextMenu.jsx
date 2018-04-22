import React, { Component } from 'react';
import {Divider, Menu, MenuItem, MuiThemeProvider, Paper} from "material-ui";
import ContentLink from 'material-ui/svg-icons/content/link'
import Reply from 'material-ui/svg-icons/content/reply'

export default class ContextMenu extends Component {
    componentDidMount() {
        document.addEventListener('click', ev => {
            this.props.handleClose(ev);
        });
    }

    reply = ev => {
        this.props.modifyActionToPropagateToMessageView({
            content: `:${this.props.messageId} `
        });
    };

    copyPermalink = ev => {
        //
    };

    render() {
        return (
            <MuiThemeProvider>
                <section className='t-context-menu' style={
                    {
                        top: `${this.props.y - 60}px`,
                        left: `${this.props.x}px`
                    }
                }>
                    <Paper zDepth={4}>
                        <Menu desktop={true} onEscKeyDown={this.props.handleClose}>
                            <MenuItem primaryText="Reply to this message" leftIcon={<Reply />} onClick={this.reply} />
                            <Divider />
                            <MenuItem primaryText="Copy permalink to clipboard" leftIcon={<ContentLink />} onClick={this.copyPermalink} />
                        </Menu>
                    </Paper>
                </section>
            </MuiThemeProvider>
        )
    }
}