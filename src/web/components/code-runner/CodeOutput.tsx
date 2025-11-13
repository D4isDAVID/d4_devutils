import { type MantineStyleProp, Textarea } from '@mantine/core';

import './CodeOutput.css';

interface CodeOutputProps {
    value: string;
    success: boolean | null;
    style: MantineStyleProp;
}

export default function CodeOutput({ value, success, style }: CodeOutputProps) {
    return (
        value && (
            <Textarea
                value={value}
                className="code-output"
                error={success === false || undefined}
                data-success={success || undefined}
                variant="filled"
                readOnly
                style={style}
                radius={0}
                autosize
                maxRows={3}
            />
        )
    );
}
