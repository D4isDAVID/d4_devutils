import { Paper, Stack } from '@mantine/core';
import type { PropsWithChildren } from 'react';

export default function Sidebar({ children }: PropsWithChildren) {
    return (
        <Paper
            radius="none"
            h="100%"
            p="1rem"
        >
            <Stack align="center">{children}</Stack>
        </Paper>
    );
}
