import { HamburgerIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, VStack, IconButton, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { Shell } from './Shell';

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
    const [activeTab, setActiveTab] = React.useState<Tab>(tabs[0]);

    const handleToggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <HStack height="100%" spacing={500} flex="2" width="100%">
            <VStack
                width={`${minWidth}px`}
                height="100%"
                // overflowX="hidden"
                overflowY="auto"
                spacing={4}
                flex="2"
                p={4}
            >
                {/* <>
                    {tabs.map(tab => (
                        <IconButton aria-label="Search database" icon={<tab.icon />} colorScheme="blue" />
                    ))}
                </>
                <Tooltip label="Phone number" fontSize="md">
                    <ArrowLeftIcon />
                    <IconButton
                        aria-label="Search database"
                        icon={<ArrowLeftIcon />}
                        colorScheme="black"
                        onClick={handleToggleCollapse}
                    />
                </Tooltip> */}
            </VStack>
            <Box px={6} py={4} borderRightWidth="4px" height="100%" width="100%" overflowY="auto">
                <p>boxj </p>
            </Box>
        </HStack>
    );
};
