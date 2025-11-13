import { NuiCallback } from '@common/nui-callbacks.ts';
import { NuiEvent } from '@common/nui-events.ts';
import { CloseButton, Group, Paper, Stack, Title } from '@mantine/core';
import { IconCode, type TablerIcon } from '@tabler/icons-react';
import { type ReactNode, useEffect, useState } from 'react';
import { useNuiEvent } from '~/hooks/useNuiEvent.ts';
import { fetchNuiCallback, isNuiEnv } from '~/utils/nui.ts';
import CodeRunnerPage from './pages/CodeRunnerPage.tsx';
import Sidebar from './sidebar/Sidebar.tsx';
import SidebarButton from './sidebar/SidebarButton.tsx';

interface PageData {
    label: string;
    node: ReactNode;
    icon: TablerIcon;
}

const pages: [PageData, ...PageData[]] = [
    { label: 'Code Runner', node: <CodeRunnerPage />, icon: IconCode },
];

const CLOSE_KEYS = ['Escape', 'F7'];
async function close() {
    await fetchNuiCallback(NuiCallback.Close, null, true);
}

export default function App() {
    const [visible, setVisible] = useState(!isNuiEnv());
    const [currentPage, setCurrentPage] = useState(pages[0]);

    useNuiEvent(NuiEvent.SetVisible, setVisible);
    useEffect(() => {
        if (!visible) {
            return;
        }

        async function keyboardListener(event: KeyboardEvent) {
            if (!CLOSE_KEYS.includes(event.code)) {
                return;
            }

            await close();
        }

        window.addEventListener('keydown', keyboardListener);
        return () => window.removeEventListener('keydown', keyboardListener);
    }, [visible]);

    return (
        visible && (
            <Paper
                radius="md"
                withBorder
                w="100%"
                h="100%"
                maw={1280}
                mah={720}
                mih="fit-content"
                miw="fit-content"
                style={{ overflow: 'hidden' }}
            >
                <Group
                    h="100%"
                    gap={0}
                    wrap="nowrap"
                >
                    <Sidebar>
                        {pages.map((page) => (
                            <SidebarButton
                                key={page.label}
                                icon={page.icon}
                                label={page.label}
                                active={page.label === currentPage.label}
                                onClick={() => setCurrentPage(page)}
                            />
                        ))}
                    </Sidebar>
                    <Stack
                        h="100%"
                        gap={0}
                        style={{ flexGrow: 1 }}
                    >
                        <Paper
                            mih="fit-content"
                            p="1rem"
                        >
                            <Group justify="space-between">
                                <Title order={4}>Code Runner</Title>
                                <CloseButton onClick={close} />
                            </Group>
                        </Paper>
                        {currentPage.node}
                    </Stack>
                </Group>
            </Paper>
        )
    );
}
