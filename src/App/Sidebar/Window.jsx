import React, { Component } from 'react';

export default class Window extends Component {
    render() {
        return (
            <section className='t-window' style={ {...this.props.customStyles, background: this.props.theme} }>
                <div style={ {background: this.props.theme} }>
                </div>
                {this.props.children}
            </section>
        )
    }
}