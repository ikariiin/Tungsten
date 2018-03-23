const css = _ => {
    return `
@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,300i,400|Material+Icons');
.material-icons {
    font-size: inherit !important;
    line-height: inherit !important;
    display: inline-flex;
    vertical-align: middle;
}
::-webkit-scrollbar-thumb {
    background: #111;
    border-radius: 20px;
}
::-webkit-scrollbar-track {
    background: transparent;
}
::-webkit-scrollbar {
    width: 8px;
}
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
    display: flex;
    line-height: 1.6;
}
.t-message-system {
    width: 70vw;
    display: flex;
    flex-direction: column;
}
.t-message-system .t-message-container {
    width: 100%;
    height: 94vh;
    overflow: auto;
}
.t-message-system .t-message-input-container {
    width: calc(100% - 20px);
    height: calc(5.7vh - 20px);
    margin: 10px;
    display: flex;
}
.t-message-input-container .t-message-input {
    background: rgba(0,0,0,.2);
    box-shadow: 0 0 3px rgba(0,0,0,.1);
    border: none;
    font-family: inherit;
    font-size: .8rem;
    font-weight: 300;
    color: #FFF;
    flex-grow: 1;
    padding: 10px;
    outline: none;
    height: calc(100% - 20px);
    border-radius: 4px;
}
.t-message-input-container .t-message-send {
    margin: 0 10px 0 20px;
    height: 33px;
    width: 33px;
    border-radius: 50%;
    background: #3f51b5;
    line-height: 26px;
    color: #FFF;
    font-size: 15px;
    border: none;
    outline: none;
    box-shadow: 0 2px 5px rgba(0,0,0,.5);
    cursor: pointer;
}
.t-message {
    font-size: .8rem;
    font-weight: 300;
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
    background: rgba(0,0,0,.3);
    padding: 10px;
    border-radius: 3px;
    margin: 10px 10px;
}
.t-message .t-messages-container .t-content a, .t-sidebar a {
    color: #e91e63;
    text-decoration: none;
}
.t-message .t-messages-container.t-current-user .t-content {
    background: #01579b;
}
.t-message .t-messages-container .t-content:first-child {
    margin-top: 0;
}
.t-sidebar {
    z-index: 1001;
    top: 0;
    right: 0;
    width: 30vw;
}
.t-window {
    margin: 10px;
    border: 5px solid #000;
    border-radius: 5px;
    background: transparent;
    border-top: 0;
    font-weight: 100;
}
.t-window .t-title {
    background: transparent;
    padding: 5px 10px;
    font-size: 1.1rem;
    font-weight: 300;
}
.t-window .t-content {
    padding: 10px;
}
.t-window .t-room-title {
    font-weight: 100;
    font-size: 1.5rem;
}
.t-window .t-room-desc {
    font-weight: 300;
    margin: 10px 0 0 0;
}
.t-passive-room-message {
    margin: 10px 0;
    color: rgba(255,255,255,.5);
    text-align: center;
}
.t-dummy-avatar {
    margin: 0 10px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
}
.t-blockquote {
    margin: 5px 10px;
    padding-left: 1.5rem;
    border-left: 2px solid #88ffff;
    white-space: pre;
}
    `
};

export default css;