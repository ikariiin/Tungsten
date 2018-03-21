class ChatWebSocketHijack {
    fkey = null;
    roomid = 17;
    uri = null;
    ws = null;

    constructor(fkey) {
        this.fkey = fkey;
    }

    getWebSocketUri() {
        return fetch(`/ws-auth`, {
            credentials: "same-origin",
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
            body: `fkey=${this.fkey}&roomid=${this.roomid}`
        });
    }

    setWS = (response, handler) => {
        this.uri = response.url;
        this.ws = new WebSocket(`${this.uri}?l=${Date.now()}`);
        this.setWSHooks(handler);
    };

    setWSHooks(handler) {
        this.ws.addEventListener('open', handler.getOnOpenHandler());
        this.ws.addEventListener('message', handler.getOnMessageHandler());
    }
}

export default ChatWebSocketHijack;