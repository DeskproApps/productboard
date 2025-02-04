import { useEffect, useState } from 'react';
import { useDeskproAppClient, useDeskproLatestAppContext } from '@deskpro/app-sdk';
import LinkItems from './LinkItems';
import { useSetTitle } from '@/hooks';
import { getObjectives } from '@/services';
import { Objective, Settings } from '@/types';

function LinkItemsPage() {
    const { client } = useDeskproAppClient();
    const { context } = useDeskproLatestAppContext<unknown, Settings>();
    const [objectives, setObjectives] = useState<Objective[]>([]);

    useEffect(() => {
        if (client && context) {
            getObjectives({ client, context })
                .then(setObjectives);
        };

    }, [client, context]);

    useSetTitle('Link Items');

    return (
        <LinkItems
            items={objectives}
            isLoading={false}
        />
    );
};

export default LinkItemsPage;