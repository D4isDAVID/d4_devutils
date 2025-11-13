import {
    ActionIcon,
    type ComboboxItem,
    Group,
    Paper,
    Select,
    Stack,
} from '@mantine/core';
import { IconCaretRightFilled } from '@tabler/icons-react';
import CodeOutput from './CodeOutput.tsx';
import CodeStatus from './CodeStatus.tsx';

export enum CodeLanguage {
    Lua = 'lua',
    JavaScript = 'javascript',
}

const languages: ComboboxItem[] = [
    {
        value: CodeLanguage.Lua,
        label: 'Lua',
    },
    {
        value: CodeLanguage.JavaScript,
        label: 'JavaScript',
    },
];

interface CodeRunnerFooterProps {
    language: string;
    output: string;
    success: boolean | null;
    onChangeLanguage(language: CodeLanguage): void;
    onRun(): void;
    onClear(): void;
}

export default function CodeRunnerFooter({
    language,
    output,
    success,
    onChangeLanguage,
    onRun,
    onClear,
}: CodeRunnerFooterProps) {
    return (
        <Paper
            mih="fit-content"
            radius="none"
        >
            <Stack gap={0}>
                <CodeOutput
                    value={output}
                    success={success}
                    style={{
                        flexGrow: 1,
                        fontFamily: 'monospace !important',
                    }}
                />
                <Group
                    justify="space-between"
                    p="1rem"
                >
                    <CodeStatus
                        success={success}
                        onClear={onClear}
                    />
                    <Group
                        align="end"
                        justify="start"
                        wrap="nowrap"
                    >
                        <Select
                            value={language}
                            maw="6rem"
                            size="xs"
                            data={languages}
                            checkIconPosition="right"
                            allowDeselect={false}
                            onChange={(value) => {
                                onChangeLanguage(value as CodeLanguage);
                            }}
                        />
                        <ActionIcon
                            size="input-xs"
                            onClick={onRun}
                        >
                            <IconCaretRightFilled />
                        </ActionIcon>
                    </Group>
                </Group>
            </Stack>
        </Paper>
    );
}
