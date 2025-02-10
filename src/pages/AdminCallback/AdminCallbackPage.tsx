import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { CopyToClipboardInput, LoadingSpinner, useInitialisedDeskproAppClient } from '@deskpro/app-sdk';
import { DeskproTheme, P1 } from '@deskpro/deskpro-ui';
import { v4 as uuid } from 'uuid';
import { useAsyncError } from '@/hooks';

const Description = styled(P1)`
    margin-top: 8px;
    color: ${({ theme }) => (theme as DeskproTheme).colors.grey80};
`;

function AdminCallbackPage() {
    const [callbackURL, setCallbackURL] = useState<string | null>(null);
    const key = useMemo(() => uuid(), []);
    const { asyncErrorHandler } = useAsyncError();

    useInitialisedDeskproAppClient(client => {
        client.oauth2()
            .getAdminGenericCallbackUrl(key, /code=(?<token>.+?)&/, /state=(?<key>[^&]+)/)
            .then(({ callbackUrl }) => {setCallbackURL(callbackUrl)})
            .catch(asyncErrorHandler);
    }, [key]);

    if (!callbackURL) return <LoadingSpinner />;

    return (
        <>
            <CopyToClipboardInput value={callbackURL || ''} />
            <Description>The callback URL origin will be required during Productboard app setup</Description>
        </>
    );
};

export default AdminCallbackPage;