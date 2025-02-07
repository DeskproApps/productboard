import { useDeskproAppClient } from '@deskpro/app-sdk';
import { Link, Logo, OverflowText, StatusBadge, TextBlockWithLabel, Title, TwoSider } from '@/components';
import { Item } from '@/types';
import { useEffect, useState } from 'react';
import { getLinkedDeskproEntitiesCount } from '@/services';

interface Info {
    item: Item;
    onTitleClick?: () => void;
};

function Info({ item, onTitleClick }: Info) {
    const { client } = useDeskproAppClient();
    const [linkedTicketsCount, setLinkedTicketsCount] = useState(0);

    useEffect(() => {
        if (!client) return;

        getLinkedDeskproEntitiesCount({ client, ID: item.id })
            .then(setLinkedTicketsCount);
    }, [client]);
    
    const ItemTitle = () => (
        <Link
            href='#'
            onClick={event => {
                event.preventDefault();
                onTitleClick?.();
            }}
        >
            {item.name}
        </Link>
    );

    const Status = () => (
        <OverflowText>
            <StatusBadge text={item.status} />
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
                leftText={<OverflowText>Parent</OverflowText>}
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
                text={<Status />}
            />
        </>
    );
};

export default Info;