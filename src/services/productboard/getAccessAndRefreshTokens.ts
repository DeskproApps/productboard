import { Context, IDeskproClient, proxyFetch } from '@deskpro/app-sdk';
import { BASE_REQUEST_BASE_APP_URL } from '@/constants';
import { Settings } from '@/types';

type GetAccessAndRefreshTokensResponse = {
    access_token: string;
    refresh_token: string;
};

interface GetAccessAndRefreshTokens {
    token: string;
    client: IDeskproClient;
    context: Context<unknown, Settings>;
    redirectURI: string;
};

async function getAccessAndRefreshTokens({ token, client, context, redirectURI }: GetAccessAndRefreshTokens): Promise<GetAccessAndRefreshTokensResponse | undefined> {
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
        const response = await fetch(`${BASE_REQUEST_BASE_APP_URL}/oauth2/token?${queryParameters.toString()}`, {
            method: 'POST'
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data: GetAccessAndRefreshTokensResponse = await response.json();

        return {
            access_token: data.access_token,
            refresh_token: data.refresh_token
        };
    } catch (error: unknown) {
        return undefined;
    };
};

export default getAccessAndRefreshTokens;