import React from 'react';
import { useDisclosure, Slide, Box, Button } from '@chakra-ui/react';
import { Shell } from './Shell';

export const ShellSlide = () => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <>
            <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
                <Box p="0px" color="white" mt="0" bg="whiteAlpha.500" rounded="sm" shadow="lg">
                    <Shell />
                </Box>
            </Slide>
            <Button style={{ position: 'fixed', bottom: 0, right: 0, zIndex: '10' }} onClick={onToggle}>
                Shell
            </Button>
        </>
    );
};
