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
                leftLabel='Board'
                leftText={<OverflowText>Board</OverflowText>}
                rightLabel='Timeframe'
                rightText={<OverflowText>TimeFrame</OverflowText>}
            />
            <TwoSider
                leftLabel='Owner'
                leftText={<OverflowText>Owner</OverflowText>}
                rightLabel='Deskpro Tickets'
                rightText={<OverflowText>DeskPro Tickets</OverflowText>}
            />
            <TwoSider
                leftLabel='Status'
                leftText={<OverflowText>Status</OverflowText>}
                rightLabel='Effort'
                rightText={<OverflowText>Effort</OverflowText>}
            />
        </>
    );
};

export default Info;