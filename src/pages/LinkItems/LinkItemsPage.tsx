import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeskproAppClient, useDeskproAppEvents, useDeskproElements, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from '@deskpro/app-sdk';
import LinkItems from './LinkItems';
import { useAsyncError, useLogIn, useSetTitle } from '@/hooks';
import { getFeatures, getRegisteredItemIDs } from '@/services';
import { ENTITY_ASSOCIATION_NAME } from '@/constants';
import { Item, Payload, TicketData } from '@/types';

function LinkItemsPage() {
    const { client } = useDeskproAppClient();
    const { context } = useDeskproLatestAppContext<TicketData, unknown>();
    const ticketID = context?.data?.ticket.id;
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItemIDs, setSelectedItemIDs] = useState<Item['id'][]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { logOut } = useLogIn();
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onElementEvent(_: string, __: string, payload: Payload) {
            switch (payload.type) {
                case 'changePage':
                    navigate(payload.path);

                    break;

                case 'logOut':
                    logOut();

                    break;
            };
        }
    });

    useInitialisedDeskproAppClient(client => {
        getFeatures({ client })
            .then(features => {
                features && setItems(features);
            })
            .catch(asyncErrorHandler);
    }, [asyncErrorHandler]);

    useInitialisedDeskproAppClient(client => {
        if (!ticketID) return;

        getRegisteredItemIDs({ client, ticketID })
            .then(setSelectedItemIDs)
            .catch(() => {setSelectedItemIDs([])});
    }, [ticketID])

    useInitialisedDeskproAppClient(client => {
        if (!ticketID) return;

        client.getEntityAssociation(ENTITY_ASSOCIATION_NAME, ticketID)
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
                .getEntityAssociation(ENTITY_ASSOCIATION_NAME, ticketID)
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