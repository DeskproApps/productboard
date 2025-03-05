import { createContext, ReactNode } from 'react';
import { initialState, reducer } from './reducer';
import { useStoreReducer } from './useStoreReducer';
import { State, Dispatch } from '@/types';

export const StoreContext = createContext<[State, Dispatch]>([initialState, () => {}]);

interface StoreProvider {
    children: ReactNode | JSX.Element;
};

function StoreProvider({ children }: StoreProvider) {
    const [state, dispatch] = useStoreReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={[state, dispatch]}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;