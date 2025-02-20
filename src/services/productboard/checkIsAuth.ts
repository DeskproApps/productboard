import { IDeskproClient } from '@deskpro/app-sdk';
import getFeatures from './getFeatures';

function checkIsAuth(client: IDeskproClient) {
    return getFeatures({ client })
        .then(() => Promise.resolve(true))
        .catch(() => Promise.resolve(false));
};

export default checkIsAuth;