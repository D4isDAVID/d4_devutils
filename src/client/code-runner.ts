import { NuiCallback } from '@common/nui-callbacks';
import { registerNuiCallback } from './utils/nui.ts';

function stringifyError(err: unknown) {
    if (!(err instanceof Error)) {
        return `${err}`;
    }

    if (err.stack) {
        return err.stack;
    }

    let message = `${err.name}: ${err.message}`;

    if (err.cause) {
        message += `: ${stringifyError(err.cause)}`;
    }

    return message;
}

registerNuiCallback(NuiCallback.RunCodeJs, (input) => {
    try {
        const result = new Function(input)();
        return { success: true, output: JSON.stringify(result) };
    } catch (err) {
        return { success: false, output: stringifyError(err) };
    }
});
