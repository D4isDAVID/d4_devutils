import { Tooltip, UnstyledButton } from '@mantine/core';
import type { TablerIcon } from '@tabler/icons-react';

import './SidebarButton.css';

interface SidebarButtonProps {
    icon: TablerIcon;
    label: string;
    active?: boolean;
    onClick?: () => void;
}

export default function SidebarButton({
    icon: Icon,
    label,
    active,
    onClick,
}: SidebarButtonProps) {
    return (
        <Tooltip
            label={label}
            position="right"
            transitionProps={{ duration: 0 }}
        >
            <UnstyledButton
                onClick={onClick}
                data-active={active || undefined}
                className="sidebar-button"
            >
                <Icon
                    stroke={1.5}
                    size="1.5rem"
                />
            </UnstyledButton>
        </Tooltip>
    );
}
