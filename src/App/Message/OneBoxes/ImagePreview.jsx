import React, { Component } from 'react';
import Avatar from "../Avatar";
import Message from "../Message";
import {FlatButton} from "material-ui";
import OpenLinkInNewTab from "../../../Utils/OpenLinkInNewTab";

export default class ImagePreview extends Component {
    preventPropagation = ev => {
        ev.persist();
        ev.preventDefault();
        ev.stopPropagation();
    };

    handleImageEnlarge = ev => {
        ev.persist();
        ev.preventDefault();
        ev.stopPropagation();
        const img = ev.target;
        img.classList.toggle('enlarge');
    };

    render() {
        return (
            <section className='t-image-preview' onClick={this.preventPropagation}>
                <section className='t-image-header' onClick={this.props.close}>
                    View image
                </section>
                <div className='t-image-container' onClick={this.props.close}>
                    <img src={this.props.src} onClick={this.handleImageEnlarge} />
                </div>
                <section className='t-image-details'>
                    <section className='t-textual-data'>
                        <section className='t-avatar-container'>
                            <div className='t-text'>
                                Posted By
                            </div>
                            <Avatar avatar={Message.getAvatarUri(this.props.data.userData['email_hash'])} />
                            <a className='t-username' href={this.props.data.userData['profileUrl']} onClick={OpenLinkInNewTab.handlerForAnchorTag}>
                                { this.props.data.userData['name'] }
                                <i className="material-icons" style={ {fontSize: "10px", marginLeft: "10px"} }>open_in_new</i>
                            </a>
                        </section>
                        <div className='t-time'>
                            { (new Date(this.props.data['messageData']['timestamp'] * 1000)).toLocaleString() }
                        </div>
                    </section>
                    <section className='t-close-button-container'>
                        <FlatButton label="Close" onClick={this.props.close} primary={true} />
                    </section>
                </section>
            </section>
        )
    }
}