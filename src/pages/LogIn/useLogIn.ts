import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OAuth2StaticCallbackUrl, useDeskproAppClient, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from '@deskpro/app-sdk';
import { v4 as uuid } from 'uuid';
import { useStore } from '@/context/Store';
import { useAsyncError } from '@/hooks';
import { getAccessAndRefreshTokens, setAccessToken, setRefreshToken } from '@/services';
import { Settings } from '@/types';

export function useLogIn() {
    const { client } = useDeskproAppClient();
    const { context } = useDeskproLatestAppContext<unknown, Settings>();
    const clientID = context?.settings.client_id;
    const [isAuthenticating, setIsAuthenticating] = useState(false);
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
            .then(setCallback);
    }, [setCallback]);

    useEffect(() => {
        if (callback?.callbackUrl && clientID && key) {
            const baseURL = 'https://app.productboard.com/oauth2/authorize';
            const queryParameters = new URLSearchParams({
                client_id: clientID,
                response_type: 'code',
                redirect_uri: callback.callbackUrl,
                state: key
            });

            setAuthURL(`${baseURL}?${queryParameters}`);
        };
    }, [callback?.callbackUrl, clientID, key]);

    const poll = useCallback(() => {
        if (!callback?.poll || !client || !context) return;

        callback.poll()
            .then(({ token }) => {
                setIsAuthenticating(true);

                return getAccessAndRefreshTokens({
                    token,
                    client,
                    context,
                    redirectURI: callback.callbackUrl
                });
            })
            .then(({ access_token, refresh_token }) => Promise.all([
                setAccessToken({ token: access_token, client }),
                setRefreshToken({ token: refresh_token, client })
            ]))
            .then(() => {
                dispatch({
                    type: 'setAuth',
                    payload: true
                });
                navigate('/link_items');
            })
            .catch(asyncErrorHandler)
            .finally(() => {
                setIsAuthenticating(false);
            });
    }, [callback?.poll, client, context, callback?.callbackUrl]);

    return {
        authURL,
        isLoading: isAuthenticating,
        poll
    };
};