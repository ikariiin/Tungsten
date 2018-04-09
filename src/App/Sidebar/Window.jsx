import React, { Component } from 'react';

export default class Window extends Component {
    render() {
        return (
            <section className='t-window' style={ {...this.props.customStyles} }>
                <div className='t-title'>
                    {this.props.title}
                </div>
                <section className='t-content'>
                    {this.props.children}
                </section>
            </section>
        )
    }
}