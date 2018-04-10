export default class OpenLinkInNewTab {
    static handlerForAnchorTag = (evt) => {
        evt.persist();
        window.open(evt.target.href, '_blank');
    };
}