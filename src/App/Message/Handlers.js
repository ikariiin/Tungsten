export default class Handlers {
    object = null;
    roomid = null;

    static EVENT_ID_MAP = {
        "MESSAGE": 1,
        "MESSAGE_EDIT": 2,
        "MESSAGE_STAR": 6,
        "MESSAGE_DELETE": 10,
    };


    constructor(object, roomid) {
        this.object = object;
        this.roomid = roomid;
    }

    getOnOpenHandler() {
        return this.object.onOpen;
    }

    getOnMessageHandler() {
        return ev => this.defaultPrimaryEventDataParser(this.roomid, ev);
    }

     defaultPrimaryEventDataParser(roomid, event) {
        const parsedEventData = JSON.parse(event.data);

        // Check if we do receive the data for the room id in the first place
        if(`r${roomid}` in parsedEventData) {
            const roomEvents = parsedEventData[`r${roomid}`]['e'];
            // If it isn't an array, we probably don't need it
            if(typeof roomEvents === "undefined" || !(roomEvents instanceof Array)) return null;

            roomEvents.forEach(event => this.processPrimaryEvent(event));
        }

        return null;
    }

     processPrimaryEvent(event) {
        switch (event['event_type']) {
            case Handlers.EVENT_ID_MAP.MESSAGE:
                this.object.onMessage({
                    type: 'message',
                    messages: [{
                        content: event['content'],
                        key: event['message_id'],
                        timestamp: event['time_stamp'],
                    }],
                    userId: event['user_id'],
                    userName: event['user_name']
                });
                break;
            default:
                console.log(event);
                console.log("Meh...");
                break;
        }
    }
}