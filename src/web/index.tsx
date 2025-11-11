import { Center, MantineProvider } from '@mantine/core';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { theme } from './theme.ts';

import '@mantine/core/styles.css';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = createRoot(rootElement);

    root.render(
        <StrictMode>
            <MantineProvider
                forceColorScheme="dark"
                theme={theme}
            >
                <Center
                    w="100vw"
                    h="100vh"
                >
                    Hello, world!
                </Center>
            </MantineProvider>
        </StrictMode>,
    );
}
