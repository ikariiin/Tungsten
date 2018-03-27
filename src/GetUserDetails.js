export default class GetUserDetails {
    userId = null;

    static URI_BASE = `${window.location.origin}/users/thumbs`;

    constructor(userId) {
        this.userId = userId;
    }

    get() {
        return fetch(`${GetUserDetails.URI_BASE}/${this.userId}?showHistory=true`).then(_ => _.json());
    }
}