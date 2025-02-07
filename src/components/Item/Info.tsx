import { useDeskproAppClient } from '@deskpro/app-sdk';
import { Link, Logo, OverflowText, Title, TwoSider } from '@/components';
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
            <TwoSider
                leftLabel='Status'
                leftText={<OverflowText>{item.status}</OverflowText>}
                rightLabel='Effort'
                rightText={<OverflowText>X</OverflowText>}
            />
        </>
    );
};

export default Info;