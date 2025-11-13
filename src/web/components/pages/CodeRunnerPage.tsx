import { NuiCallback } from '@common/nui-callbacks.ts';
import { Stack } from '@mantine/core';
import { useState } from 'react';
import { fetchNuiCallback } from '~/utils/nui.ts';
import CodeEditor from '../code-runner/CodeEditor.tsx';
import CodeRunnerFooter, {
    CodeLanguage,
} from '../code-runner/CodeRunnerFooter.tsx';

function getLanguageRunCallback(language: CodeLanguage) {
    switch (language) {
        case CodeLanguage.Lua:
            return NuiCallback.RunCodeLua;
        case CodeLanguage.JavaScript:
            return NuiCallback.RunCodeJs;
        default:
            return null;
    }
}

export default function CodeRunnerPage() {
    const [language, setLanguage] = useState(CodeLanguage.Lua);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('Output');
    const [success, setSuccess] = useState<boolean | null>(null);

    async function runCode() {
        const callback = getLanguageRunCallback(language);

        if (callback === null) {
            setSuccess(false);
            setOutput(`Callback not defined for ${language}.`);
            return;
        }

        const data = await fetchNuiCallback(callback, input, {
            success: true,
            output: '',
        });

        setSuccess(data.success);
        setOutput(data.output);
    }

    return (
        <Stack
            h="100%"
            align="stretch"
            gap={0}
        >
            <CodeEditor
                language={language}
                value={input}
                onChange={setInput}
            />
            <CodeRunnerFooter
                language={language}
                output={output}
                success={success}
                onChangeLanguage={setLanguage}
                onRun={runCode}
                onClear={() => {
                    setOutput('');
                    setSuccess(null);
                }}
            />
        </Stack>
    );
}
