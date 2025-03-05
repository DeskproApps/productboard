import { produce } from 'immer';
import { Action, State, StoreReducer } from '@/types';

export const initialState: State = {
    isAuth: false
};

export const reducer: StoreReducer = (state: State, action: Action): State => {
    return produce(state, draft => {
        switch (action.type) {
            case 'setAuth':
                draft.isAuth = action.payload;

                break;
            
            default:
                break;
        };
    });
};