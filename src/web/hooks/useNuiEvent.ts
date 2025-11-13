import { useEffect, useRef } from 'react';
import type {
    NuiEvent,
    NuiEventData,
    NuiMessageData,
} from '../../common/nui-events.ts';

type NuiEventHandler<T extends NuiEvent> = (data: NuiEventData[T]) => void;

export function useNuiEvent<T extends NuiEvent>(
    nuiEvent: T,
    handler: NuiEventHandler<T>,
) {
    const savedHandler = useRef<NuiEventHandler<T>>(() => ({}));

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        function messageListener(
            event: MessageEvent<NuiMessageData<NuiEvent>>,
        ) {
            const { event: messageEvent, data } = event.data;

            if (messageEvent !== nuiEvent) {
                return;
            }

            savedHandler.current(data);
        }

        window.addEventListener('message', messageListener);
        return () => window.removeEventListener('message', messageListener);
    }, [nuiEvent]);
}
