import mount from './Mounter';

const parser = node => {
    if( node.classList && node.classList.contains('message') ) {
        console.log(node);
    }
};

const watcher = node => {
};

// const observer = new DOMObserver();
//
// observer.addParser(parser, '.user-container .message');
// observer.drain();

mount();