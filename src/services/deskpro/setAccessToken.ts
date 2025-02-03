import { IDeskproClient } from '@deskpro/app-sdk';

interface SetAccessToken {
    token: string;
    client: IDeskproClient;
};

function setAccessToken({ token, client }: SetAccessToken) {
    return client.setUserState('oauth2/access_token', token, {backend: true});
};

export default setAccessToken;