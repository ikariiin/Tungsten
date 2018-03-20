import React from 'react';
import { render } from 'react-dom';

import App from './App/App';
import css from './Stylesheet/Main.css.js';

const mount = _ => {
    const mountingElement = document.createElement('main');
    mountingElement.classList.add('mounter');

    const styleElement = document.createElement('style');
    styleElement.textContent = css();
    document.head.appendChild(styleElement);

    document.body.appendChild(mountingElement);

    render(<App />, mountingElement);
};

export default mount;
