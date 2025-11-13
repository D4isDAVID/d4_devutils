import {
    genericRegisterNetEvent,
    type ServerNetEvent,
    type ServerNetEventArgs,
    type ServerNetEventResponse,
} from '@common/net-events';

type RegisterNetEventFunc<Event extends ServerNetEvent> =
    typeof genericRegisterNetEvent<
        Event,
        ServerNetEventArgs,
        ServerNetEventResponse
    >;
export function registerNetEvent<Event extends ServerNetEvent>(
    ...[event, handler]: Parameters<RegisterNetEventFunc<Event>>
): ReturnType<RegisterNetEventFunc<Event>> {
    type ResponseWithSource = {
        [K in keyof ServerNetEventResponse]: [
            number,
            ...ServerNetEventResponse[K],
        ];
    };

    return genericRegisterNetEvent<
        Event,
        ServerNetEventArgs,
        ResponseWithSource
    >(event, async (...args) => {
        const player = source;
        const response = await handler(...args);

        return (
            Array.isArray(response) ? [player, ...response] : undefined
        ) as ResponseWithSource[Event] extends unknown[]
            ? ResponseWithSource[Event]
            : undefined;
    });
}
