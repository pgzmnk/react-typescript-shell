import { HamburgerIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, VStack, Flex } from '@chakra-ui/react';
import React from 'react';
import { Shell } from './Shell';
import { Form } from './Form';

interface Props {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    minWidth: number;
}
interface Tab {
    id: string;
    component: (props: any) => any;
    icon: React.FC;
}

const tabs: Tab[] = [
    {
        id: 'shell',
        component: Shell,
        icon: HamburgerIcon,
    },
];

export const Drawer = ({ collapsed, setCollapsed, minWidth }: Props) => {
    const handleToggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <VStack height="100%" min-height={minWidth} spacing={2} flex="2" width="100%">
            <HStack height="80px" minHeight="80px" width="100%" justify="right">
                <Form />
                <Button onClick={handleToggleCollapse} colorScheme="teal" variant="outline">
                    Shell
                </Button>
            </HStack>
            <Shell />
        </VStack>
    );
};
