import { useEffect, useState } from 'react';
import { useDeskproAppClient } from '@deskpro/app-sdk';
import LinkItems from './LinkItems';
import { useSetTitle } from '@/hooks';
import { getFeatures } from '@/services';
import { Item } from '@/types';

function LinkItemsPage() {
    const { client } = useDeskproAppClient();
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        if (!client) return;

        client.registerElement('menu', {
            type: 'menu',
            items: [{
                title: 'Log Out',
                payload: {
                    type: 'logOut'
                }
            }]
        });
    }, [client]);

    useEffect(() => {
        if (!client) return;

        getFeatures({ client })
            .then(setItems);
    }, [client]);

    useSetTitle('Link Items');

    return (
        <LinkItems
            items={items}
            isLoading={false}
        />
    );
};

export default LinkItemsPage;