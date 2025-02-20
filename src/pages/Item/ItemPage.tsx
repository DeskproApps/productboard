import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingSpinner, useDeskproAppEvents, useDeskproElements, useInitialisedDeskproAppClient } from '@deskpro/app-sdk';
import { Container, Logo, StatusBadge, TextBlockWithLabel, Title } from '@/components';
import { useAsyncError, useSetTitle, useUnlinkItem } from '@/hooks';
import { getFeature } from '@/services';
import { Item, Payload } from '@/types';

function ItemPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [item, setItem] = useState<Item>();
    const { unlink, isLoading } = useUnlinkItem();
    const { asyncErrorHandler } = useAsyncError();

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onElementEvent(_: string, __: string, payload: Payload) {
            switch (payload.type) {
                case 'changePage':
                    navigate(payload.path);

                    break;

                case 'unlinkItem':
                    item && void unlink(item);
                    
                    break;
            };
        }
    }, [navigate, item]);

    useInitialisedDeskproAppClient(client => {
        if (!id) return;

        getFeature({ id, client })
            .then(feature => {
                feature && setItem(feature);
            })
            .catch(asyncErrorHandler)
    }, [id, asyncErrorHandler]);

    if (!item?.id) return;

    if (isLoading) {
        return (
            <Container>
                <LoadingSpinner />
            </Container>
        );
    };

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