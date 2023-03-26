import React from 'react';
import {
    useDisclosure,
    Slide,
    Box,
    HStack,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Text,
    ModalBody,
    ModalCloseButton,
    VStack,
    StackDivider,
} from '@chakra-ui/react';

import { LoadDataButton } from './LoadDataButton';

export const DemoModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box height="100vh" flex="1" width="100%">
            <Button onClick={onOpen} position="fixed" top="5" right="20" colorScheme="blue" size="lg">
                Try Demo
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Data Explorer</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4}>
                            <Text>
                                Welcome to Map Explorer! We use DuckDB and FourSquare Studio to bring immediacy to
                                geospatial analytics.
                            </Text>
                            <LoadDataButton />
                            <HStack divider={<StackDivider borderColor="gray.200" />} spacing={4}>
                                <Box w="40px" h="40px" bg="yellow.200">
                                    1
                                </Box>
                                <Box w="40px" h="40px" bg="tomato">
                                    2
                                </Box>
                                <Box w="40px" h="40px" bg="pink.100">
                                    3
                                </Box>
                            </HStack>
                        </VStack>
                    </ModalBody>

                    {/* <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            About us
                        </Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
        </Box>
    );
};
