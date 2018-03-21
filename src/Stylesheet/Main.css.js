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
    height: 100%;
    background: #232323;
    color: #FFFFFF;
    z-index: 1000;
    overflow: auto;
}
.t-message {
    font-size: 1rem;
    margin: 10px 0;
    display: flex;
}
.t-avatar {
    margin: 0 10px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    box-shadow: 0 2px 3px rgba(0,0,0,.3);
    background-size: cover;
}
.t-message .t-messages-container {
    flex-grow: 1;
}
.t-message .t-messages-container .t-content {
    background: #62727b;
    padding: 10px;
    border-radius: 3px;
    margin: 10px 10px;
}
    `
};

export default css;