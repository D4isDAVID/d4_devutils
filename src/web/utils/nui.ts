import type {
    NuiCallback,
    NuiCallbackData,
    NuiCallbackResponse,
} from '../../common/nui-callbacks.ts';

export function isNuiEnv() {
    return 'invokeNative' in window;
}

export async function fetchNuiCallback<T extends NuiCallback>(
    eventName: T,
    data: NuiCallbackData[T],
    mockResponse: NuiCallbackResponse[T],
): Promise<NuiCallbackResponse[T]> {
    if (!isNuiEnv()) {
        return mockResponse;
    }

    const resourceName = window.GetParentResourceName();
    const response = await fetch(`https://${resourceName}/${eventName}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
    });

    return await response.json();
}
