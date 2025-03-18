import { useCallback, useRef, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { IOAuth2, useDeskproAppClient, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from '@deskpro/app-sdk';
import { useStore } from '@/context/Store';
import { useAsyncError } from '@/hooks';
import { deleteAccessToken, deleteRefreshToken, getAccessAndRefreshTokens, setAccessToken, setRefreshToken } from '@/services';
import { BASE_REQUEST_BASE_APP_URL, GLOBAL_CLIENT_ID } from '@/constants';
import { Settings } from '@/types';

function useLogIn() {
    const { client } = useDeskproAppClient();
    const { context } = useDeskproLatestAppContext<unknown, Settings>();
    const [_, dispatch] = useStore();
    const callbackURLRef = useRef('');
    const [oAuth2Context, setOAuth2Context] = useState<IOAuth2 | null>(null);
    const [authURL, setAuthURL] = useState('');
    const [isPolling, setIsPolling] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { asyncErrorHandler } = useAsyncError();

    useInitialisedDeskproAppClient(async client => {
        if (context?.settings.use_deskpro_saas === undefined) {
            return;
        };

        const clientID = context.settings.client_id;
        const mode = context?.settings.use_deskpro_saas ? 'global' : 'local';

        if (mode === 'local' && typeof clientID !== 'string') {
            return;
        };

        const oauth2Response = mode === 'global' ? await client.startOauth2Global(GLOBAL_CLIENT_ID) : await client.startOauth2Local(
            ({ callbackUrl, state }) => {
                callbackURLRef.current = callbackUrl;

                return `${BASE_REQUEST_BASE_APP_URL}/oauth2/authorize?${createSearchParams([
                    ['client_id', clientID ?? ''],
                    ['state', state],
                    ['response_type', 'code'],
                    ['redirect_uri', callbackUrl]
                ])}`;
            },
            /code=(?<code>[^&]+)/,
            async code => {
                const data = await getAccessAndRefreshTokens({
                    client,
                    code,
                    redirectURI: callbackURLRef.current
                });

                return { data };
            }
        );

        setOAuth2Context(oauth2Response);
        setAuthURL(oauth2Response.authorizationUrl);
    }, [context]);

    useInitialisedDeskproAppClient(client => {
        if (!oAuth2Context) {
            return;
        };

        const startPolling = async () => {
            try {
                const pollResult = await oAuth2Context.poll();
    
                await setAccessToken({ client, token: pollResult.data.access_token });
                pollResult.data.refresh_token && await setRefreshToken({ client, token: pollResult.data.refresh_token });
                dispatch({
                    type: 'setAuth',
                    payload: true
                });
                navigate('/home');
            } catch (error) {
                logOut();
                asyncErrorHandler(error instanceof Error ? error : new Error('error logging in'));
            } finally {
                setIsPolling(false);
                setIsLoading(false);
            };
        };

        if (isPolling) {
            startPolling();
        };
    }, [oAuth2Context, navigate, isPolling]);

    const onLogIn = useCallback(() => {
        setIsLoading(true);
        setIsPolling(true);
        window.open(authURL, '_blank');
    }, [setIsLoading, authURL]);

    const logOut = useCallback(() => {
        if (!client) return;

        setIsLoading(true);

        Promise.all([
            deleteAccessToken({ client }),
            deleteRefreshToken({ client })
        ])
            .then(() => {
                dispatch({
                    type: 'setAuth',
                    payload: false
                });
                client.setBadgeCount(0);
                navigate('/log_in');
            })
            .catch(asyncErrorHandler)
            .finally(() => {
                setIsLoading(false);
            });
    }, [client, dispatch, navigate, asyncErrorHandler]);

    return {
        authURL,
        isLoading,
        onLogIn,
        logOut
    };
};

export default useLogIn;