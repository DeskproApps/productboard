import { IDeskproClient } from '@deskpro/app-sdk';
import baseRequest from './baseRequest';

function checkIsAuth(client: IDeskproClient) {
    return baseRequest({ client, endpoint: '/jira-integrations' }) // endpoint just used to check authentication
        .then(() => Promise.resolve(true))
        .catch(() => Promise.resolve(false));
};

export default checkIsAuth;