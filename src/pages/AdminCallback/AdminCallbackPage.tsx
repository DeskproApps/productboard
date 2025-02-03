import { useMemo, useState } from 'react';
import { CopyToClipboardInput, LoadingSpinner, useInitialisedDeskproAppClient } from '@deskpro/app-sdk';
import { P1 } from '@deskpro/deskpro-ui';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { getURLOrigin } from '@/utils';

const Description = styled(P1)`
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.grey80};
`;

function AdminCallbackPage() {
    const [callbackURL, setCallbackURL] = useState<string | null>(null);
    const key = useMemo(() => uuid(), []);
    const origin = useMemo(() => getURLOrigin(callbackURL), [callbackURL]);

    useInitialisedDeskproAppClient((client) => {
        client.oauth2()
            .getAdminGenericCallbackUrl(key, /code=(?<code>.+?)&/, /state=(?<state>[^&]+)/)
            .then(({ callbackUrl }) => setCallbackURL(callbackUrl));
    }, [key]);

    if (!origin) return (<LoadingSpinner />);

    return (
        <>
            <CopyToClipboardInput value={origin} />
            <Description>The callback URL origin will be required during ProductBoard app setup</Description>
        </>
    );
};

export default AdminCallbackPage;