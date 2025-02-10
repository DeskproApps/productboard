import { IDeskproClient } from '@deskpro/app-sdk';
import { USER_OAUTH_REFRESH_TOKEN_PATH } from '@/constants';

interface DeleteRefreshToken {
    client: IDeskproClient;
};

function deleteRefreshToken({ client }: DeleteRefreshToken) {
    return client.deleteUserState(USER_OAUTH_REFRESH_TOKEN_PATH);
};

export default deleteRefreshToken;