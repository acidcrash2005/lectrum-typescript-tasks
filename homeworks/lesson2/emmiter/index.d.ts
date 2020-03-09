type Handler = () => void;

interface Events {
    [key: string]: Array<Handler>;
}

export class Listeners {
    on(type: string, handler: Handler): Emitter;
    off(type: string, handler: Handler): Emitter | undefined;
    trigger(event: string | Event, args: any[]): Emitter | undefined;
}

export class Emitter extends Listeners {
    static Event: typeof Event;
    static mixin: <T extends Listeners, A extends ['on', 'off', 'trigger']>(
        obj: T,
        array: A
    ) => void;
    events: Events;

    constructor();

    _offAll(): Emitter;
    _offByType(type: string): Emitter;
    _offByHandler(type: string, handler: Handler): Emitter | undefined;
    _dispatch(event: Event, args: any[]): Emitter | undefined;
}

export class Event {
    type: string;
    timeStamp: Date;

    constructor(event: string);
}
