import MonacoEditor from '@monaco-editor/react';

import './CodeEditor.css';

interface EditorProps {
    language: string;
    value: string;
    onChange(value: string): void;
}

export default function CodeEditor({ language, value, onChange }: EditorProps) {
    return (
        <MonacoEditor
            language={language}
            theme="vs-dark"
            value={value}
            options={{
                automaticLayout: true,
                glyphMargin: false,
                lineNumbersMinChars: 4,
                minimap: {
                    enabled: false,
                },
                overviewRulerBorder: false,
                overviewRulerLanes: 0,
                padding: {
                    top: 8,
                    bottom: 8,
                },
                scrollbar: {
                    verticalScrollbarSize: 8,
                    horizontalScrollbarSize: 8,
                    useShadows: false,
                },
                scrollBeyondLastLine: false,
                folding: false,
            }}
            onChange={(value) => onChange(value ?? '')}
        />
    );
}
