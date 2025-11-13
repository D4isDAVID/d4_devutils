import {
    genericTriggerNetEvent,
    type ServerNetEvent,
    type ServerNetEventArgs,
    type ServerNetEventResponse,
} from '@common/net-events';

type TriggerNetEventFunc<Event extends ServerNetEvent> =
    typeof genericTriggerNetEvent<
        Event,
        ServerNetEventArgs,
        ServerNetEventResponse
    >;
export function triggerNetEvent<Event extends ServerNetEvent>(
    ...params: Parameters<TriggerNetEventFunc<Event>>
): ReturnType<TriggerNetEventFunc<Event>> {
    return genericTriggerNetEvent(...params);
}
