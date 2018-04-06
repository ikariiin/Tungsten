import React from 'react';
import { render } from 'react-dom';

import App from './App/App';
import css from './Stylesheet/Main.css.js';

function insertHighlightJSScript() {
    const uri = "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.12.0/build/highlight.min.js";
    const script = document.querySelector("script");
    script.src = uri;

    document.body.appendChild(script);
}

const mount = _ => {
    const mountingElement = document.createElement('main');
    //mountingElement.classList.add('mounter');

    const styleElement = document.createElement('style');
    styleElement.textContent = css();
    document.head.appendChild(styleElement);

    document.body.appendChild(mountingElement);

    document.querySelector('#input-area').remove();

    insertHighlightJSScript();

    render(<App />, mountingElement);
};

export default mount;
