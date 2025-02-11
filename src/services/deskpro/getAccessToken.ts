import { IDeskproClient } from '@deskpro/app-sdk';
import { USER_OAUTH_ACCESS_TOKEN_PATH } from '@/constants';

interface GetAccessToken {
    client: IDeskproClient;
};

function getAccessToken({ client }: GetAccessToken) {
    return client.getUserState<string>(USER_OAUTH_ACCESS_TOKEN_PATH);
};

export default getAccessToken;