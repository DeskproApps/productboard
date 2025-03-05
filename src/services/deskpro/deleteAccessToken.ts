import { IDeskproClient } from '@deskpro/app-sdk';
import { USER_OAUTH_ACCESS_TOKEN_PATH } from '@/constants';

interface DeleteAccessToken {
    client: IDeskproClient;
};

function deleteAccessToken({ client }: DeleteAccessToken) {
    return client.deleteUserState(USER_OAUTH_ACCESS_TOKEN_PATH);
};

export default deleteAccessToken;