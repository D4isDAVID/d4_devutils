import { ServerNetEvent } from '@common/net-events.ts';
import { NuiCallback } from '@common/nui-callbacks';
import { NuiEvent } from '@common/nui-events';
import { triggerNetEvent } from './utils/net.ts';
import { registerNuiCallback, sendNuiEvent } from './utils/nui.ts';

function toggleVisibility(visible: boolean) {
    SetNuiFocus(visible, visible);
    sendNuiEvent(NuiEvent.SetVisible, visible);
}

registerNuiCallback(NuiCallback.Close, () => {
    toggleVisibility(false);
    return true;
});

RegisterCommand(
    'devutils_open',
    () => {
        triggerNetEvent(ServerNetEvent.OpenMenu, [], (allowed) => {
            if (allowed) {
                toggleVisibility(true);
            }
        });
    },
    true,
);

RegisterKeyMapping(
    'devutils_open',
    'Opens the development utilities menu',
    'keyboard',
    'F7',
);
