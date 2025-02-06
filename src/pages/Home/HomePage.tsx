import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HorizontalDivider, useDeskproAppClient, useDeskproAppEvents, useDeskproElements, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from '@deskpro/app-sdk';
import { useSetTitle } from '@/hooks';
import { Item as ItemType, Payload, TicketData } from '@/types';
import { getFeatures, getRegisteredItemIDs } from '@/services';
import { Container, Item } from '@/components';
import { P1 } from '@deskpro/deskpro-ui';

function HomePage() {
    const { client } = useDeskproAppClient();
    const { context } = useDeskproLatestAppContext<TicketData, unknown>();
    const ticketID = context?.data?.ticket.id;
    const [items, setItems] = useState<ItemType[]>([]);
    const [linkedItems, setLinkedItems] = useState<ItemType[]>([]);
    const [linkedItemIDs, setLinkedItemIDs] = useState<ItemType['id'][]>([]);
    const navigate = useNavigate();

    useSetTitle('ProductBoard');

    useDeskproElements(({ clearElements, registerElement }) => {
        clearElements();
        registerElement('plus', {
            type: 'plus_button',
            payload: {
                type: 'changePage',
                path: '/create_item'
            }
        });
        registerElement('refresh', {type: 'refresh_button'});
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
        if (!client || !ticketID) return;

        getFeatures({ client })
            .then(setItems);

        getRegisteredItemIDs({ client, ticketID })
            .then(setLinkedItemIDs)
            .catch(() => {setLinkedItemIDs([])});
    }, [client, ticketID]);

    useEffect(() => {
        setLinkedItems(items.filter(item => linkedItemIDs.includes(item.id)));

        console.log('x', ticketID, items, linkedItems, linkedItemIDs)
    }, [items, linkedItemIDs]);

    useInitialisedDeskproAppClient(client => {
        if (!ticketID) return;

        client.getEntityAssociation('linkedProductboardItems', ticketID)
            .list()
            .then(itemIDs => {client.setBadgeCount(itemIDs.length)})
            .catch(() => client.setBadgeCount(0));
    });

    return (
        <Container>
            {!linkedItems.length ? (
                <P1>No Linked Items</P1>
            ) : linkedItems.map(linkedItem => (
                <Fragment key={linkedItem.id}>
                    <Item
                        item={linkedItem}
                        onTitleClick={() => {navigate('/home')}}                   
                    />
                    <HorizontalDivider style={{marginBottom: 6}} />
                </Fragment>
            ))}
        </Container>
    );
};

export default HomePage;