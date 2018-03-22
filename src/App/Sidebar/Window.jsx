import React, { Component } from 'react';

export default class Window extends Component {
    render() {
        return (
            <section className='t-window' style={ {borderColor: this.props.theme, ...this.props.customStyles} }>
                <div className='t-title' style={ {background: this.props.theme, color: this.props.themeContrastText} }>
                    {this.props.title}
                </div>
                <section className='t-content'>
                    {this.props.children}
                </section>
            </section>
        )
    }
}