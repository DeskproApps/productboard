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
    // temporary
    access_token: string;
    refresh_token: string;
};

export type Option<Value = unknown> = Omit<DropdownValueType<Value>, 'subItems'>;

export type Objective = {
    id: string;
    name: string;
    link: string;
};

export type Item =
    | Objective;