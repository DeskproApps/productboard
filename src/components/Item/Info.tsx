import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInitialisedDeskproAppClient } from '@deskpro/app-sdk';
import { Link, Logo, OverflowText, StatusBadge, TextBlockWithLabel, Title, TwoSider } from '@/components';
import { useAsyncError } from '@/hooks';
import { getLinkedDeskproEntitiesCount, getProduct } from '@/services';
import { Item, Parent, Product } from '@/types';

const Status = ({ item }: {item: Item}) => (
    <OverflowText>
        <StatusBadge text={item.status} />
    </OverflowText>
);

interface Info {
    item: Item;
};

function Info({ item }: Info) {
    const [parent, setParent] = useState<Product>();
    const [linkedTicketsCount, setLinkedTicketsCount] = useState(0);
    const navigate = useNavigate();
    const { asyncErrorHandler } = useAsyncError();

    useInitialisedDeskproAppClient(client => {
        getLinkedDeskproEntitiesCount({ client, id: item.id })
            .then(setLinkedTicketsCount)
            .catch(asyncErrorHandler);
    }, [item.id, asyncErrorHandler]);
    
    const ItemTitle = () => (
        <Link
            href='#'
            onClick={event => {
                event.preventDefault();
                navigate(`/item/${item.id}`);
            }}
        >
            {item.name}
        </Link>
    );

    useInitialisedDeskproAppClient(client => {
        if (!item.parent) return;

        const parentType = Object.keys(item.parent)[0] as Parent;

        if (parentType === 'product') {
            getProduct({ id: item.parent.product.id, client })
                .then(parent => {
                    parent && setParent(parent);
                })
                .catch(asyncErrorHandler);
        };
    }, [item.parent, asyncErrorHandler]);

    const ParentLink = () => (
        <OverflowText>
            <Link href={parent?.link} target='_blank'>{parent?.name || '—'}</Link>
        </OverflowText>
    );

    return (
        <>
            <Title
                title={<ItemTitle />}
                icon={<Logo />}
                link={item.link}
            />
            <TwoSider
                leftLabel='Parent'
                leftText={<ParentLink />}
                rightLabel='Timeframe'
                rightText={<OverflowText>{item.timeframe}</OverflowText>}
            />
            <TwoSider
                leftLabel='Owner'
                leftText={<OverflowText>{item.owner}</OverflowText>}
                rightLabel='Deskpro Tickets'
                rightText={<OverflowText>{linkedTicketsCount}</OverflowText>}
            />
            <TextBlockWithLabel
                label='Status'
                text={<Status item={item} />}
            />
        </>
    );
};

export default Info;