import { IDeskproClient } from '@deskpro/app-sdk';

interface SetRefreshToken {
    token: string;
    client: IDeskproClient;
};

function setRefreshToken({ token, client }: SetRefreshToken) {
    return client.setUserState('oauth2/refresh_token', token, {backend: true});
};

export default setRefreshToken;