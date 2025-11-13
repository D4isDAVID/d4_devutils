import { ActionIcon, Group, Text, Tooltip } from '@mantine/core';

import './CodeStatus.css';
import { IconBackspaceFilled } from '@tabler/icons-react';

interface CodeStatusProps {
    success: boolean | null;
    onClear(): void;
}

export default function CodeStatus({ success, onClear }: CodeStatusProps) {
    return success === null ? (
        <div />
    ) : (
        <Group>
            <Text
                className="code-status"
                data-error={!success || undefined}
                data-success={success || undefined}
            >
                {success ? 'Success' : 'Error'}
            </Text>
            <Tooltip label="Clear output">
                <ActionIcon
                    variant="subtle"
                    size="input-xs"
                    onClick={onClear}
                >
                    <IconBackspaceFilled />
                </ActionIcon>
            </Tooltip>
        </Group>
    );
}
