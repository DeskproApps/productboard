import { IDeskproClient, proxyFetch } from '@deskpro/app-sdk';

interface BaseRequest {
    client: IDeskproClient;
    endpoint: string;
    method?: 'GET' | 'POST';
    queryParameters?: URLSearchParams;
    data?: FormData | Record<string, string>;
};

type BaseRequestType = <T>(parameters: BaseRequest) => Promise<T>;

const baseRequest: BaseRequestType = async ({
    client,
    endpoint,
    method = 'GET',
    queryParameters = new URLSearchParams(),
    data
}) => {
    const fetch = await proxyFetch(client);

    // URL
    
    const baseURL = 'https://api.productboard.com';
    let requestURL = `${baseURL}${endpoint}`;

    if (queryParameters.size > 0) requestURL += `?${queryParameters}`;

    // headers

    const headers: Record<string, string> = {};

    headers['authorization'] = 'Bearer [user[oauth2/access_token]]';
    headers['x-version'] = '1';

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