import React, { useState, useRef, useCallback } from 'react';
import { Allotment, AllotmentHandle } from 'allotment';
import { Box, Button } from '@chakra-ui/react';
import 'allotment/dist/style.css';

// import { ShellSlide } from './components/ShellSlide';
// import { Shell } from './components/Shell';
import { Map } from './Map';
// import { Inference } from './components/Inference';
// import { Form } from './components/Form';
import { Drawer } from './Drawer';

const MIN_WIDTH = 60;

export const MapEditor = () => {
    // drawer logic
    const allotmentRef = useRef<AllotmentHandle>(null!);
    const [collapsed, setCollapsed] = useState(false);
    const onWidthChange = useCallback(
        (newWidths: number[]) => setCollapsed(newWidths[1] === MIN_WIDTH),
        [setCollapsed],
    );

    return (
        <Box height="100vh" flex="1" width="100%">
            <Box height="100vh">
                <Allotment ref={allotmentRef} vertical>
                    <Allotment.Pane minSize={200} visible>
                        <Box height="calc(100vh - MIN_WIDTH)" width="100%">
                            <Map />
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
