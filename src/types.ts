import { Reducer } from 'react';
import { DropdownValueType } from '@deskpro/deskpro-ui';

export type TicketData = {
    ticket: {
        id: string;
        subject: string;
        permalinkUrl: string;
    };
};

export type Settings = {
    client_id: string;
    client_secret: string;
};

export type Option<Value = unknown> = Omit<DropdownValueType<Value>, 'subItems'>;

export type Product = {
    id: string;
    name: string;
    link: string;
};

export type Objective = {
    id: string;
    name: string;
    link: string;
};

export type Parent = 
    | 'product';

export type Feature = {
    id: string;
    name: string;
    link: string;
    owner: string;
    status: string;
    timeframe: string;
    parent: {
        [key in Parent]: {
            id: string;
        };
    };
};

export type Item =
    | Feature;

export type Payload = // app events
    | {type: 'logOut'}
    | {type: 'changePage', path: string};

// store context

export type State = {
    isAuth: boolean;
};

export type Action =
    | {type: 'setAuth', payload: boolean};

export type StoreReducer = Reducer<State, Action>;

export type Dispatch = (action: Action) => void;