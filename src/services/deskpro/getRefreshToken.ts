import { IDeskproClient } from '@deskpro/app-sdk';
import { USER_OAUTH_REFRESH_TOKEN_PATH } from '@/constants';

interface GetRefreshToken {
    client: IDeskproClient;
};

function getRefreshToken({ client }: GetRefreshToken) {
    return client.getUserState<string>(USER_OAUTH_REFRESH_TOKEN_PATH);
};

export default getRefreshToken;