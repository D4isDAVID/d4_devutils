import type {
    NuiCallback,
    NuiCallbackData,
    NuiCallbackResponse,
} from '@common/nui-callbacks.ts';
import type {
    NuiEvent,
    NuiEventData,
    NuiMessageData,
} from '@common/nui-events.ts';

export function sendNuiEvent<T extends NuiEvent>(
    event: T,
    data: NuiEventData[T],
) {
    SendNUIMessage({ event, data } satisfies NuiMessageData<T>);
}

export function registerNuiCallback<T extends NuiCallback>(
    callback: T,
    handler: (data: NuiCallbackData[T]) => NuiCallbackResponse[T] | undefined,
) {
    RegisterNuiCallback(
        callback,
        (
            data: NuiCallbackData[T],
            cb: (response: NuiCallbackResponse[T]) => void,
        ) => {
            const response = handler(data);

            if (typeof response !== 'undefined') {
                cb(response);
            }
        },
    );
}
