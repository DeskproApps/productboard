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