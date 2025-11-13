import { ServerNetEvent } from '@common/net-events';
import { registerNetEvent } from './utils/net';

registerNetEvent(ServerNetEvent.OpenMenu, () => {
    return [IsPlayerAceAllowed(`${source}`, 'devutils.open')];
});
