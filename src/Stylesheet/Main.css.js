const css = _ => {
    return `
body {
    font-family: Roboto, sans-serif;
    overflow: hidden;
}
.mounter {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: #232323;
    color: #FFFFFF;
    z-index: 1000;
    overflow: auto;
}
.message {
    font-size: 1rem;
    margin: 10px 0;
}
    `
};

export default css;