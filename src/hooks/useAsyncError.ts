import { useState, useCallback } from 'react';

function useAsyncError() {
    const [_, setError] = useState();

    const asyncErrorHandler = useCallback((error: Error) => {
        setError(() => {
            throw error;
        });
    }, [setError]);

    return { asyncErrorHandler };
};

export default useAsyncError;