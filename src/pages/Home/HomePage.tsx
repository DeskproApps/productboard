import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HorizontalDivider, useDeskproAppClient, useDeskproAppEvents, useDeskproElements, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from '@deskpro/app-sdk';
import { P1 } from '@deskpro/deskpro-ui';
import { Container, Item } from '@/components';
import { useLogIn, useSetTitle } from '@/hooks';
import { getFeatures, getRegisteredItemIDs } from '@/services';
import { Item as ItemType, Payload, TicketData } from '@/types';

function HomePage() {
    const { client } = useDeskproAppClient();
    const { context } = useDeskproLatestAppContext<TicketData, unknown>();
    const ticketID = context?.data?.ticket.id;
    const [items, setItems] = useState<ItemType[]>([]);
    const [linkedItems, setLinkedItems] = useState<ItemType[]>([]);
    const [linkedItemIDs, setLinkedItemIDs] = useState<ItemType['id'][]>([]);
    const [selectedItemIDs, setSelectedItemIDs] = useState<ItemType['id'][]>([]);
    const navigate = useNavigate();
    const { logOut } = useLogIn();

    useSetTitle('ProductBoard');

    useDeskproElements(({ clearElements, registerElement }) => {
        clearElements();
        registerElement('plus', {
            type: 'plus_button',
            payload: {
                type: 'changePage',
                path: '/link_items'
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

                case 'logOut':
                    logOut();
            };
        }
    }, [navigate, logOut]);

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
    }, [items, linkedItemIDs]);

    useInitialisedDeskproAppClient(client => {
        if (!ticketID) return;

        client.getEntityAssociation('linkedProductboardItems', ticketID)
            .list()
            .then(itemIDs => {client.setBadgeCount(itemIDs.length)})
            .catch(() => client.setBadgeCount(0));
    });

    const handleItemSelectionChange = (item: ItemType) => {
        let newItemIDsSelection = structuredClone(selectedItemIDs);

        if (selectedItemIDs.some(ID => item.id === ID)) {
            newItemIDsSelection = selectedItemIDs.filter(ID => ID !== item.id);
        } else {
            newItemIDsSelection.push(item.id);
        };

        setSelectedItemIDs(newItemIDsSelection);
    };

    return (
        <Container>
            <HorizontalDivider style={{marginTop: '10px', marginBottom: '10px'}} />
            {!linkedItems.length ? (
                <P1>No Linked Items</P1>
            ) : linkedItems.map(linkedItem => (
                <Fragment key={linkedItem.id}>
                    <Item
                        item={linkedItem}
                        showCheckbox={false}
                        checked={selectedItemIDs.some(ID => linkedItem.id === ID)}
                        onCheck={() => handleItemSelectionChange(linkedItem)}
                    />
                </Fragment>
            ))}
        </Container>
    );
};

export default HomePage;