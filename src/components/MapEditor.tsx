import React, { useState, useRef, useCallback } from 'react';
import { Allotment, AllotmentHandle } from 'allotment';
import { Box, HStack } from '@chakra-ui/react';
import 'allotment/dist/style.css';

import { Map } from './Map';
import { Drawer } from './Drawer';
import { DemoModal } from './DemoModal';
import { SelectDisplayMap } from './SelectDisplayMap';

const MIN_WIDTH = 100;

export const MapEditor = () => {
    // drawer logic
    const allotmentRef = useRef<AllotmentHandle>(null!);
    const [collapsed, setCollapsed] = useState(true);
    const onWidthChange = useCallback(
        (newWidths: number[]) => setCollapsed(newWidths[1] === MIN_WIDTH),
        [setCollapsed],
    );
    const [displayMap, setDisplayMap] = React.useState<string>('');

    return (
        <Box height="100vh" flex="1" width="100%">
            <Box height="100vh">
                <Allotment ref={allotmentRef} onChange={onWidthChange} vertical>
                    <Allotment.Pane minSize={200} visible>
                        <Box height="calc(100vh - MIN_WIDTH)" width="100%" position="relative">
                            <Map />
                            <HStack spacing="24px" top="5" right="100" position="absolute">
                                <Box>
                                    <DemoModal />
                                </Box>
                                <Box>
                                    <SelectDisplayMap displayMap={displayMap} setDisplayMap={setDisplayMap} />
                                </Box>
                            </HStack>
                        </Box>
                    </Allotment.Pane>
                    <Allotment.Pane minSize={MIN_WIDTH} visible>
                        <Drawer
                            collapsed={collapsed}
                            setCollapsed={(newCollapsed: boolean) => {
                                setCollapsed(newCollapsed);

                                // if collapsed, resize to min, else to default
                                if (allotmentRef.current) {
                                    if (newCollapsed) {
                                        allotmentRef.current.resize([10000, MIN_WIDTH]);
                                    } else {
                                        allotmentRef.current.reset();
                                    }
                                }
                            }}
                            minWidth={MIN_WIDTH}
                        />
                    </Allotment.Pane>
                </Allotment>
            </Box>
        </Box>
    );
};
