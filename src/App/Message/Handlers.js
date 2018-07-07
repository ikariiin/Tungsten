export default class Handlers {
    object = null;
    roomid = null;
    messageHandlers = [];

    static EVENT_ID_MAP = {
        "MESSAGE": 1,
        "MESSAGE_EDIT": 2,
        "USER_JOIN": 3,
        "USER_LEAVE": 4,
        "ROOM_NAME_CHANGE": 5,
        "MESSAGE_STAR": 6,
        "USER_PINGED": 8,
        "MESSAGE_FLAGGED": 9,
        "MESSAGE_DELETE": 10,
        "MOD_FLAG": 12,
        "GLOB_NOTIFICATION": 14,
        "USER_KICKED": 15,
        "USER_NOTIFICATION": 16,
        "USER_INVITE": 17,
        "MESSAGE_MOVED_OUT": 19,
        "MESSAGE_MOVED_IN": 20
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

        Object.keys(parsedEventData).forEach(roomKey => {
            const roomEvents = parsedEventData[roomKey]['e'];

            // If it isn't an array, we probably don't need it
            if(typeof roomEvents === "undefined" || !(roomEvents instanceof Array)) return;

            this.object.onOtherRoomsMessage.forEach(handler => handler(roomEvents));
        });

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
                this.sendMessageToMessageHandler(event);
                break;
            case Handlers.EVENT_ID_MAP.USER_JOIN:
                this.sendDataToUserJoinHandler(event);
                break;
            case Handlers.EVENT_ID_MAP.USER_LEAVE:
                this.sendDataToUserLeaveHandler(event);
                break;
            default:
                console.log(event);
                console.log("Meh...");
                break;
        }
    }

    createStreamForMessage = (message) => {
        if(message['room_id'] === this.roomid) {
            return (callback) => {}
        }
    };

    sendMessageToMessageHandler(event) {
        this.object.onMessage.forEach(handler => handler({
                type: 'message',
                messages: [{
                    content: event['content'],
                    key: event['message_id'],
                    timestamp: event['time_stamp'],
                    stars: event['message_stars'] ? event['message_stars'] : 0,
                    selfStarred: event['message_starred'] ? event['message_starred'] : false,
                    ownerStarred: event['message_owner_starred'] ? event['message_owner_starred'] : false,
                    replyTo: event['parent_id'] ? event['parent_id'] : null,
                    messageStream: this.createStreamForMessage(event)
                }],
                userId: event['user_id'],
                userName: event['user_name']
            })
        );
    }

    sendDataToUserJoinHandler(event) {
        this.object.onUserJoin.forEach(handler => handler(event));
    }

    sendDataToUserLeaveHandler(event) {
        this.object.onUserLeave.forEach(handler => handler(event));
    }
}
