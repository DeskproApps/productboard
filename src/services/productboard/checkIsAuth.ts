import { IDeskproClient } from '@deskpro/app-sdk';
import baseRequest from './baseRequest';

function checkIsAuth(client: IDeskproClient) {
    return baseRequest({ client, endpoint: '/jira-integrations' }) // endpoint used to check authentication, until a specific endpoint is created
        .then(() => Promise.resolve(true))
        .catch(() => Promise.resolve(false));
};

export default checkIsAuth;