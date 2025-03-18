import { IDeskproClient, proxyFetch } from '@deskpro/app-sdk';
import { BASE_REQUEST_BASE_APP_URL } from '@/constants';

type GetAccessAndRefreshTokensResponse = {
    access_token: string;
    refresh_token: string;
};

interface GetAccessAndRefreshTokens {
    client: IDeskproClient;
    code: string;
    redirectURI: string;
};

async function getAccessAndRefreshTokens({ client, code, redirectURI }: GetAccessAndRefreshTokens) {
    const fetch = await proxyFetch(client);

    try {
        const queryParameters = new URLSearchParams({
            client_id: '__client_id__',
            client_secret: '__client_secret__',
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectURI,
        });
        const response = await fetch(`${BASE_REQUEST_BASE_APP_URL}/oauth2/token?${queryParameters.toString()}`, {
            method: 'POST'
        });
        const data = await response.json() as GetAccessAndRefreshTokensResponse;

        return {
            access_token: data.access_token,
            refresh_token: data.refresh_token
        };
    } catch (error: unknown) {
        throw new Error('error getting access and refresh tokens');
    };
};

export default getAccessAndRefreshTokens;