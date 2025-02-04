import { Context, IDeskproClient, proxyFetch } from '@deskpro/app-sdk';
import { Settings } from '@/types';

interface BaseRequest {
    client: IDeskproClient;
    context: Context<unknown, Settings>;
    endpoint: string;
    method?: 'GET' | 'POST';
    queryParameters?: URLSearchParams;
    data?: FormData | Record<string, string>;
};

async function baseRequest({
    client,
    context,
    endpoint,
    method = 'GET',
    queryParameters = new URLSearchParams(),
    data
}: BaseRequest) {
    const fetch = await proxyFetch(client);

    // URL
    
    const baseURL = 'https://api.productboard.com';
    let requestURL = `${baseURL}${endpoint}`;

    if (queryParameters.size > 0) requestURL += `?${queryParameters}`;

    // headers

    const headers: Record<string, string> = {};

    if (context?.settings.access_token) headers['authorization'] = `Bearer ${context.settings.access_token}`;

    // body

    let body = undefined;

    if (data instanceof FormData) body = data;
    else if (data) {
        headers['content-type'] = 'application/json';
        headers['accept'] = 'application/json';
        body = JSON.stringify(data);
    };

    // response

    const response = await fetch(requestURL, { method, headers, body });

    if (response.status < 200 || response.status >= 400) {
        throw new Error('ProductBoard API Error:', await response.json());
    } else {
        try {
            return await response.json();
        } catch (error) {
            console.error('ProductBoard API Error 2:', error);
        };
    };
};

export default baseRequest;