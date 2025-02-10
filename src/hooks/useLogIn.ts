import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OAuth2StaticCallbackUrl, useDeskproAppClient, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from '@deskpro/app-sdk';
import { v4 as uuid } from 'uuid';
import { useStore } from '@/context/Store';
import { useAsyncError } from '@/hooks';
import { deleteAccessToken, deleteRefreshToken, getAccessAndRefreshTokens, setAccessToken, setRefreshToken } from '@/services';
import { BASE_REQUEST_BASE_APP_URL } from '@/constants';
import { Settings } from '@/types';

function useLogIn() {
    const { client } = useDeskproAppClient();
    const { context } = useDeskproLatestAppContext<unknown, Settings>();
    const clientID = context?.settings.client_id;
    const [isLoading, setIsLoading] = useState(false);
    const [callback, setCallback] = useState<OAuth2StaticCallbackUrl | null>(null);
    const [authURL, setAuthURL] = useState<string | null>(null);
    const key = useMemo(() => uuid(), []);
    const [_, dispatch] = useStore();
    const navigate = useNavigate();
    const { asyncErrorHandler } = useAsyncError();

    useInitialisedDeskproAppClient(client => {
        client
            .oauth2()
            .getGenericCallbackUrl(key, /code=(?<token>.+?)&/, /state=(?<key>[^&]+)/)
            .then(setCallback)
            .catch(asyncErrorHandler);
    }, [setCallback]);

    useEffect(() => {
        if (callback?.callbackUrl && clientID && key) {
            const baseURL = `${BASE_REQUEST_BASE_APP_URL}/oauth2/authorize`;
            const queryParameters = new URLSearchParams({
                client_id: clientID,
                response_type: 'code',
                redirect_uri: callback.callbackUrl,
                state: key
            });

            setAuthURL(`${baseURL}?${queryParameters.toString()}`);
        };
    }, [callback, clientID, key]);

    const poll = useCallback(() => {
        if (!callback?.poll || !client || !context) return;

        callback.poll()
            .then(({ token }) => {
                setIsLoading(true);

                return getAccessAndRefreshTokens({
                    token,
                    client,
                    context,
                    redirectURI: callback.callbackUrl
                });
            })
            .then(response => {
                if (!response?.access_token || !response?.refresh_token) {
                    throw new Error('no access and refresh tokens');
                };

                const { access_token, refresh_token } = response;

                return Promise.all([
                    setAccessToken({ token: access_token, client }),
                    setRefreshToken({ token: refresh_token, client })
                ]);
            })
            .then(() => {
                dispatch({
                    type: 'setAuth',
                    payload: true
                });
                navigate('/home');
            })
            .catch(asyncErrorHandler)
            .finally(() => {
                setIsLoading(false);
            });
    }, [callback, client, context, dispatch, navigate, asyncErrorHandler]);

    const logOut = () => {
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
    };

    return {
        authURL,
        isLoading,
        poll,
        logOut
    };
};

export default useLogIn;