type EventFunc = (type: string, handler: () => void) => void;
type TriggerFunc = (event: string | IEvent, args: any[]) => void;
type ArrayHandlers = Array<(args?: any[]) => void>;

interface IEvent {
    type: string;
    timeStamp: Date;
}

interface IEmitter {
    events: {
        [key: string]: ArrayHandlers;
    };
    on: EventFunc;
    off: EventFunc;
    trigger: TriggerFunc;
}

class EmitterEvent implements IEvent {
    type: string;
    timeStamp: Date;

    constructor(type: string) {
        this.type = type;
        this.timeStamp = new Date();
    }
}

class Emitter implements IEmitter {
    events: {
        [key: string]: ArrayHandlers;
    };

    constructor() {
        this.events = {};
    }

    static mixin(obj: { [key: string]: ArrayHandlers }, arr: string[]) {
        const emitter = new Emitter();

        arr.map(name => {
            obj[name] = () => {
                return emitter[name].apply(emitter, arguments);
            };
        });
    }

    on(type: string, handler: () => void) {
        if (this.events.hasOwnProperty(type)) {
            this.events[type].push(handler);
        } else {
            this.events[type] = [handler];
        }
        return this;
    }

    off(type: string, handler: () => void) {
        if (arguments.length === 0) {
            return this._offAll();
        }
        if (handler === undefined) {
            return this._offByType(type);
        }
        return this._offByHandler(type, handler);
    }

    trigger(event: string | EmitterEvent, args: any[]) {
        if (!(event instanceof EmitterEvent)) {
            event = new EmitterEvent(event);
        }
        return this._dispatch(event, args);
    }

    _dispatch(event: IEvent, args: any[]) {
        if (!this.events.hasOwnProperty(event.type)) return;
        args = args || [];
        args.unshift(event);

        const handlers = this.events[event.type] || [];
        handlers.forEach(handler => handler(args));
        return this;
    }

    _offByHandler(type: string, handler: () => void) {
        if (!this.events.hasOwnProperty(type)) return;
        const i = this.events[type].indexOf(handler);
        if (i > -1) {
            this.events[type].splice(i, 1);
        }
        return this;
    }

    _offByType(type: string) {
        if (this.events.hasOwnProperty(type)) {
            delete this.events[type];
        }
        return this;
    }

    _offAll() {
        this.events = {};
        return this;
    }
}
