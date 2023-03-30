import React from 'react';
import { Select } from '@chakra-ui/react';

import examples from '../data/examples.json';

interface SelectDisplayMapProps {
    displayMap: string;
    setDisplayMap: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectDisplayMap: React.FC<any> = (props: SelectDisplayMapProps) => {
    const { displayMap, setDisplayMap } = props;

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('handleChange...', event.target.value);
        setDisplayMap(event.target.value);
    };

    return (
        <div className="">
            <Select
                onChange={handleChange}
                value={displayMap}
                placeholder="Examples"
                size="lg"
                bg="whiteAlpha.100"
                color="white"
            >
                {Object.entries(examples).map(([key, value]) => (
                    <option key={key} value={key}>
                        {value.prompt}
                    </option>
                ))}
            </Select>
        </div>
    );
};
