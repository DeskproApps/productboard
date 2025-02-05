import { IDeskproClient } from '@deskpro/app-sdk';

interface DeleteRefreshToken {
    client: IDeskproClient;
};

function deleteRefreshToken({ client }: DeleteRefreshToken) {
    return client.deleteUserState('oauth2/refresh_token');
};

export default deleteRefreshToken;