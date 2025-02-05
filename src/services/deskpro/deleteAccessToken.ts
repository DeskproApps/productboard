import { IDeskproClient } from '@deskpro/app-sdk';

interface DeleteAccessToken {
    client: IDeskproClient;
};

function deleteAccessToken({ client }: DeleteAccessToken) {
    return client.deleteUserState('oauth2/access_token');
};

export default deleteAccessToken;