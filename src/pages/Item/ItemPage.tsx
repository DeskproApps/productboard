import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeskproAppClient, useDeskproAppEvents, useDeskproElements } from '@deskpro/app-sdk';
import { Container, Logo, StatusBadge, TextBlockWithLabel, Title } from '@/components';
import { useSetTitle, useUnlinkItem } from '@/hooks';
import { getFeature } from '@/services';
import { Item, Payload } from '@/types';

function ItemPage() {
    const { client } = useDeskproAppClient();
    const navigate = useNavigate();
    const { id } = useParams();
    const [item, setItem] = useState<Item>();
    const { unlink } = useUnlinkItem();

    useSetTitle('Productboard');

    useDeskproElements(({ clearElements, registerElement }) => {
        clearElements();
        registerElement('home', {
            type: 'home_button',
            payload: {
                type: 'changePage',
                path: '/home'
            }
        });
        registerElement('edit', {
            type: 'edit_button'
        });
        registerElement('refresh', {type: 'refresh_button'});
        registerElement('menu', {
            type: 'menu',
            items: [{
                title: 'Unlink Item',
                payload: {
                    type: 'unlinkItem'
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

                case 'unlinkItem':
                    console.log('unlinking')
                    item && unlink(item);
                    
                    break;
            };
        }
    });

    useEffect(() => {
        if (!client || !id) return;

        getFeature({ id, client })
            .then(setItem)
    }, [client, id]);

    if (!item?.id) return;

    return (
        <Container>
            <Title
                title={item.name}
                icon={<Logo />}
                link={item.link}
            />
            <TextBlockWithLabel
                label='Description'
                text={item.description || 'No Description'}
                isHTML
            />
            <TextBlockWithLabel
                label='Status'
                text={<StatusBadge text={item.status} />}
            />
            <TextBlockWithLabel
                label='Owner'
                text={item.owner}
            />
            <TextBlockWithLabel
                label='Timeframe'
                text={item.timeframe}
            />
        </Container>
    );
};

export default ItemPage;