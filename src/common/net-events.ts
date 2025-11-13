type Awaitable<T> = PromiseLike<T> | T;

export enum ServerNetEvent {
    OpenMenu = 'openMenu',
}

export interface ServerNetEventArgs {
    [ServerNetEvent.OpenMenu]: [];
}

export type ServerNetEventResponse = {
    [ServerNetEvent.OpenMenu]: [boolean];
};

function getEventName(event: string | number | symbol) {
    return `d4_devutils:${event.toString()}`;
}

function getCallbackName(event: string) {
    return `${event}:callback`;
}

export function genericRegisterEvent<
    Event extends string,
    Args extends Record<Event, unknown[]>,
>(event: Event, handler: (...args: Args[Event]) => void) {
    on(getEventName(event), handler);
}

export function genericRegisterNetEvent<
    Event extends string,
    Args extends Record<Event, unknown[]>,
    Response extends Partial<Record<keyof Args, unknown[]>>,
>(
    event: Event,
    handler: (
        ...args: Args[Event]
    ) => Awaitable<
        Response[Event] extends unknown[] ? Response[Event] : undefined
    >,
) {
    const eventName = getEventName(event);

    onNet(eventName, async (...args: Args[Event]) => {
        const response = await handler(...args);

        if (Array.isArray(response)) {
            emitNet(getCallbackName(eventName), ...response, args.at(-1));
        }
    });
}

export function genericTriggerEvent<
    Event extends string,
    Args extends Record<Event, unknown[]>,
>(event: Event, args: Args[Event]) {
    emit(getEventName(event), ...args);
}

export function genericTriggerNetEvent<
    Event extends string,
    Args extends Record<Event, unknown[]>,
    Response extends Partial<Record<keyof Args, unknown[]>>,
>(
    event: Event,
    args: Args[Event],
    callback: Response[Event] extends unknown[]
        ? (...args: Response[Event]) => Awaitable<void>
        : never,
) {
    const eventName = getEventName(event);

    if (typeof callback !== 'undefined') {
        const nonce = Math.random() * 100000;
        const callbackName = getCallbackName(eventName);

        args.push(nonce);

        async function onCallback(
            ...response: Response[Event] extends unknown[]
                ? Response[Event]
                : never
        ) {
            if (response.pop() !== nonce) {
                return;
            }

            removeEventListener(callbackName, onCallback);
            await callback(...response);
        }

        onNet(callbackName, onCallback);
    }

    emitNet(eventName, ...args);
}
