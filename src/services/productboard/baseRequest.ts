import { IDeskproClient, proxyFetch } from '@deskpro/app-sdk';
import { BASE_REQUEST_BASE_API_URL, USER_BASE_REQUEST_BEARER_TOKEN_PATH } from '@/constants';

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
    
    const baseURL = BASE_REQUEST_BASE_API_URL;
    let requestURL = `${baseURL}${endpoint}`;

    if (queryParameters.size > 0) requestURL += `?${queryParameters.toString()}`;

    // headers

    const headers: Record<string, string> = {};

    headers['authorization'] = `Bearer ${USER_BASE_REQUEST_BEARER_TOKEN_PATH}`;
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const errorResponse = await response.json();

        throw new Error(`ProductBoard API Error: ${JSON.stringify(errorResponse)}`);
    } else {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return await response.json();
        } catch (error) {
            return undefined;
        };
    };
};

export default baseRequest;