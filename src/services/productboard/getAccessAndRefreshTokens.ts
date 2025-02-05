import { Context, IDeskproClient, proxyFetch } from '@deskpro/app-sdk';
import { Settings } from '@/types';

interface GetAccessAndRefreshTokens {
    token: string;
    client: IDeskproClient;
    context: Context<unknown, Settings>;
    redirectURI: string;
};

async function getAccessAndRefreshTokens({ token, client, context, redirectURI }: GetAccessAndRefreshTokens) {
    const clientID = context.settings.client_id;
    const clientSecret = context.settings.client_secret;
    const fetch = await proxyFetch(client);

    if (!clientID || !clientSecret) return;

    try {
        const queryParameters = new URLSearchParams({
            client_id: clientID,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            redirect_uri: redirectURI,
            code: token
        });
        const response = await fetch(`https://app.productboard.com/oauth2/token?${queryParameters}`, {
            method: 'POST'
        });
        const data = await response.json();

        return data;
    } catch (error: any) {
        console.log('error getting access and refresh tokens:', error);
    };
};

export default getAccessAndRefreshTokens;