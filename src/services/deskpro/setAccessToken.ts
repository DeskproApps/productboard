import { IDeskproClient } from '@deskpro/app-sdk';
import { USER_OAUTH_ACCESS_TOKEN_PATH } from '@/constants';

interface SetAccessToken {
    token: string;
    client: IDeskproClient;
};

function setAccessToken({ token, client }: SetAccessToken) {
    return client.setUserState(USER_OAUTH_ACCESS_TOKEN_PATH, token);
};

export default setAccessToken;