import { useState, useCallback } from 'react';

function useAsyncError() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setError] = useState();

    const asyncErrorHandler = useCallback((error: Error) => {
        setError(() => {
            throw error;
        });
    }, [setError]);

    return { asyncErrorHandler };
};

export default useAsyncError;