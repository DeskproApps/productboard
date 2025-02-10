import { IDeskproClient } from '@deskpro/app-sdk';
import { USER_OAUTH_REFRESH_TOKEN_PATH } from '@/constants';

interface SetRefreshToken {
    token: string;
    client: IDeskproClient;
};

function setRefreshToken({ token, client }: SetRefreshToken) {
    return client.setUserState(USER_OAUTH_REFRESH_TOKEN_PATH, token, {backend: true});
};

export default setRefreshToken;