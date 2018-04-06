const css = _ => {
    return `
@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,300i,400,500|Roboto+Mono:400|Material+Icons');
.material-icons {
    font-size: inherit !important;
    line-height: inherit !important;
    display: inline-flex;
    vertical-align: middle;
}
::-webkit-scrollbar {
    width: 8px;
}
::-webkit-scrollbar-thumb {
    background: #111;
    border-radius: 20px;
}
::-webkit-scrollbar-track {
    background: transparent;
}
::-webkit-scrollbar:vertical {
    width: 8px;
}
::-webkit-scrollbar:horizontal {
    height: 8px;
}
:root {
    --contrast-theme-color: #1d7791;
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
    padding: 6.5px 10px;
    border-radius: 3px;
    margin: 10px 10px;
}
.t-message .t-messages-container .t-content a, .t-sidebar a {
    color: #e91e63;
    text-decoration: none;
}
.t-message .t-messages-container.t-current-user .t-content {
    background: var(--contrast-theme-color);
    color: #FFF;
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
.t-message-removed {
    color: rgba(255,255,255,.4);
}
.t-room {
    background: #FFF;
    color: #363636;
    /* padding: 4px; */
    border-radius: 2px;
    box-shadow: 0 4px 5px rgba(0,0,0,.4);
}
.t-room:not(:first-child) {
    margin-top: 7px;
}
.t-room-name {
    font-size: 1.15rem;
    font-weight: 300;
    padding: 4px;
}
.t-room-name a {
    color: #363636;
    text-decoration: none;
}
.t-room-recent-message {
    background: rgba(0,0,0,.1);
    padding: 4px;
    display: flex;
}
.t-room-recent-message .t-user-name {
    font-weight: 500;
    font-size: .9rem;
    margin: 2px 3px 0 3px;
    height: 20px;
    overflow: hidden;
}
.t-room-recent-message .t-message-content {
    font-weight: 400;
    font-size: .9rem;
    height: 20px;
    padding: 0 8px;
    flex-grow: 1;
    overflow: hidden;
    max-width: calc(80% - 16px);
}
.t-muted-text {
    text-align: center;
    color: rgba(255,255,255,.4);
}

.t-image-upload-button-container {
    margin: 0 10px 0 0;
}
.t-image-upload-button {
    background: rgba(255,255,255,.1);
    border: none;
    outline: none;
    color: #FFF;
    border-radius: 3px;
    height: 37px;
    width: 37px;
    line-height: 26px;
    font-size: 15px;
    border: none;
    outline: none;
    box-shadow: 0 2px 5px rgba(0,0,0,.5);
    cursor: pointer;
}

.t-uploading-progress {
    width: 100%;
    height: 300px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    font-weight: 100;
    background: rgba(0,0,0,.1);
}
.t-dropzone-modal {
    width: 100%;
    height: 300px;
    border-radius: 3px;
    cursor: pointer;
}
.t-dropzone-inside-text {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,.1);
    cursor: pointer;
}
.t-dropzone-inside-text.t-active {
    background: rgba(0,255,0,.1);
}
.t-dropzone-inside-text.t-rejected {
    background: rgba(255,0,0,.1);
}
.t-dropzone-inside-text.t-accepted {
    background: rgba(0,0,0,0);
    cursor: auto;
}
.t-preview-grid-container {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    overflow-x: hidden;
}
.t-dropzone-inside-text.t-accepted .t-preview-image {
    margin: 10px;
    border-radius: 3px;
    box-shadow: 0 3px 5px rgba(0,0,0,.4);
    background-size: cover;
    /* Making it 33% rather than 33.333333% because .333333% accounts for the border on the placeholder image. */
    width: calc(33% - 20px);
    height: 220px;
    display: block;
    position: relative;
    cursor: auto;
}
.t-dropzone-inside-text.t-accepted .t-dump-icon {
    font-size: 24px !important;
    position: absolute;
    bottom: calc(-30px / 2);
    right: calc(-30px / 2);
    border-radius: 50%;
    line-height: 34px;
    width: 43px;
    height: 43px;
    background: #FFF;
    color: #222;
    box-shadow: 0 3px 5px rgba(0,0,0,.4);
    cursor: pointer;
}
.t-dropzone-inside-text .t-upload-icon {
    font-size: 50px !important;
    margin: 10px 0;
}
.t-dropzone-inside-text .t-image-placeholder {
    border: 3px dashed #666;
    display: block;
    align-items: center;
    justify-content: center;
    margin: 10px;
    border-radius: 3px;
    width: calc(33% - 20px);
    height: 220px;
    cursor: pointer;
}
.t-dropzone-inside-text .t-add-icon {
    font-size: 30px important;
}

.ace_editor, pre, code {
    font-family: "Roboto Mono", "Monaco", Consolas, "Courier New", monospace;
}

.hljs{color:#a9b7c6;background:#282b2e;display:block;overflow-x:auto;padding:0.5em}.hljs-number,.hljs-literal,.hljs-symbol,.hljs-bullet{color:#6897BB}.hljs-keyword,.hljs-selector-tag,.hljs-deletion{color:#cc7832}.hljs-variable,.hljs-template-variable,.hljs-link{color:#629755}.hljs-comment,.hljs-quote{color:#808080}.hljs-meta{color:#bbb529}.hljs-string,.hljs-attribute,.hljs-addition{color:#6A8759}.hljs-section,.hljs-title,.hljs-type{color:#ffc66d}.hljs-name,.hljs-selector-id,.hljs-selector-class{color:#e8bf6a}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:bold}
    `
};

export default css;