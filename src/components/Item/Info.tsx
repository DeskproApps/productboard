import { Title } from '@deskpro/app-sdk';
import { Link, Logo, OverflowText, TwoSider } from '@/components';
import { Item } from '@/types';

interface Info {
    item: Item;
    onTitleClick?: () => void;
};

function Info({ item, onTitleClick }: Info) {
    const ItemTitle = () => (
        <Link
            href='#'
            onClick={event => {
                event.preventDefault();
                onTitleClick && onTitleClick();
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
                rightText={<OverflowText>DeskPro Tickets</OverflowText>}
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