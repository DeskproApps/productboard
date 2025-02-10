import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeskproAppClient, useDeskproAppEvents, useDeskproElements, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from '@deskpro/app-sdk';
import LinkItems from './LinkItems';
import { useAsyncError, useSetTitle } from '@/hooks';
import { getFeatures, getRegisteredItemIDs } from '@/services';
import { Item, TicketData } from '@/types';

function LinkItemsPage() {
    const { client } = useDeskproAppClient();
    const { context } = useDeskproLatestAppContext<TicketData, unknown>();
    const ticketID = context?.data?.ticket.id;
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItemIDs, setSelectedItemIDs] = useState<Item['id'][]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { asyncErrorHandler } = useAsyncError();

    useSetTitle('Link Items');

    useDeskproElements(({ clearElements, registerElement }) => {
        clearElements();
        registerElement('refresh', {type: 'refresh_button'});
        registerElement('home', {
            type: 'home_button',
            payload: {
                type: 'changePage',
                path: '/home'
            }
        });
        registerElement('menu', {
            type: 'menu',
            items: [{
                title: 'Log Out',
                payload: {
                    type: 'logOut'
                }
            }]
        });
    });

    useDeskproAppEvents({
        // @ts-ignore
        onElementEvent(_: string, __: string, payload: Payload) {
            switch (payload.type) {
                case 'changePage':
                    navigate(payload.path);

                    break;
            };
        }
    });

    useEffect(() => {
        if (!client) return;

        getFeatures({ client })
            .then(features => {
                features && setItems(features);
            });
    }, [client]);

    useEffect(() => {
        if (!client || !ticketID) return;

        getRegisteredItemIDs({ client, ticketID })
            .then(setSelectedItemIDs)
            .catch(() => {setSelectedItemIDs([])});
    }, [client, ticketID])

    useInitialisedDeskproAppClient(client => {
        if (!ticketID) return;

        client.getEntityAssociation('linkedProductboardItems', ticketID)
            .list()
            .then(itemIDs => {client.setBadgeCount(itemIDs.length)})
            .catch(() => {client.setBadgeCount(0)});
    }, [client]);

    const handleItemSelectionChange = (item: Item) => {
        let newItemIDsSelection = structuredClone(selectedItemIDs);

        if (selectedItemIDs.some(ID => item.id === ID)) {
            newItemIDsSelection = selectedItemIDs.filter(ID => ID !== item.id);
        } else {
            newItemIDsSelection.push(item.id);
        };

        setSelectedItemIDs(newItemIDsSelection);
    };

    const handleLinkTasks = () => {
        if (!client || !ticketID || !selectedItemIDs.length) return;

        setIsSubmitting(true);

        Promise.all([
            ...selectedItemIDs.map(ID => client
                .getEntityAssociation('linkedProductboardItems', ticketID)
                .set(ID)
            )
        ])
            .then(() => {
                setIsSubmitting(false);
                navigate('/home');
            })
            .catch(asyncErrorHandler);
    };

    return (
        <LinkItems
            items={items}
            selectedItemIDs={selectedItemIDs}
            onItemSelectionChange={handleItemSelectionChange}
            onLinkTasks={handleLinkTasks}
            isLoading={false}
            isSubmitting={isSubmitting}
        />
    );
};

export default LinkItemsPage;