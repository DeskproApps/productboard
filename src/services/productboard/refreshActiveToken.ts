import { IDeskproClient, proxyFetch } from '@deskpro/app-sdk';
import { BASE_REQUEST_BASE_APP_URL } from '@/constants';

type RefreshActiveTokenResponse = {
    access_token: string;
    refresh_token: string;
};

interface RefreshActiveToken {
    refreshToken: string;
    client: IDeskproClient;
};

async function refreshActiveToken({ refreshToken, client }: RefreshActiveToken) {
    const fetch = await proxyFetch(client);

    try {
        const queryParameters = new URLSearchParams({
            client_id: '__client_id__',
            client_secret: '__client_secret__',
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        });
        const response = await fetch(`${BASE_REQUEST_BASE_APP_URL}/oauth2/token?${queryParameters.toString()}`, {
            method: 'POST'
        });
        const data = await response.json() as RefreshActiveTokenResponse;

        return {
            access_token: data.access_token,
            refresh_token: data.refresh_token
        };
    } catch (error: unknown) {
        throw new Error('error refreshing active token');
    };
};

export default refreshActiveToken;