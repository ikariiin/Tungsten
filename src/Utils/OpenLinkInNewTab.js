export default class OpenLinkInNewTab {
    static handlerForAnchorTag = (evt) => {
        evt.persist();
        window.open(evt.target.href, '_blank');
    };

    static open = (uri) => {
        window.open(uri, '_blank');
    };
}