import { useReducer } from 'react';
import { State, StoreReducer } from '@/types';

export function useStoreReducer(reducer: StoreReducer, initialState: State) {
    return useReducer(reducer, initialState);
};