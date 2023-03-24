import React from 'react';

export const Inference: React.FC<any> = () => {
    React.useEffect(() => {
        async function fetchData() {
            console.log('fetching data');
        }
        fetchData();
    }, []);

    return (
        <div className="">
            <h1>Interface</h1>
        </div>
    );
};
