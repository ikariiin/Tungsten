/**
 * @author rlemnon <https://github.com/rlemon>
 */
class DOMObserver {
    parsers = [];
    queue = [];
    watchers = [];

    observer = new MutationObserver(
        records => {
            for (const record of records) {
                this.force(record);
            }
        }
    ).observe(document.body, {
        subtree: true,
        childList: true
    });

    addParser (parser, selector) {
        if( selector ) this.queue.push(selector);
        this.parsers.push(parser);
    }

    addWatcher (watcher) {
        this.watchers.push(watcher);
    }

    drain() {
        for( const selector of this.queue ) {
            this.force({addedNodes: document.querySelectorAll(selector)});
        }
        this.queue = [];
    }

    force({addedNodes, removedNodes = []}) {
        for( const addedNode of Array.from(addedNodes) ) {
            if( !addedNode.classList ) return;
            this.parsers.forEach( parser => parser(addedNode));
        }
        for( const removedNode of Array.from(removedNodes) ) {
            this.watchers.forEach( watcher => watcher(removedNode) );
        }
    }
}

export default DOMObserver;