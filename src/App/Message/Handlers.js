export default class Handlers {
    object = null;

    constructor(object) {
        this.object = object;
    }

    getOnOpenHandler() {
        return this.object.onOpen;
    }

    getOnMessageHandler() {
        return this.object.onMessage;
    }

    static defaultPrimaryEventDataParser(roomid, event) {
        const parsedEventData = JSON.parse(event.data);

        // Check if we do receive the data for the room id in the first place
        if(`r${roomid}` in parsedEventData) {
            const roomEvents = parsedEventData[`r${roomid}`]['e'];
            // If it isn't an array, we probably don't need it
            if(typeof roomEvents === "undefined" || !(roomEvents instanceof Array)) return null;

            roomEvents.forEach(console.log.bind(console));
        }

        return null;
    }
}