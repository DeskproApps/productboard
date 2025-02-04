import { Title } from '@deskpro/app-sdk';
import { Link, Logo } from '@/components';
import { Item } from '@/types';

interface Info {
    item: Item;
    onTitleClick?: () => void;
};

function Info({ item, onTitleClick }: Info) {
    const ItemTitle = () => (
        <Link
            href="#"
            onClick={(e) => { e.preventDefault(); onTitleClick && onTitleClick() }}
        >
            {item.name}
        </Link>
    )

    return (
        <>
            <Title
                title={<ItemTitle />}
                icon={<Logo />}
                link={item.link}
            />
        </>
    );
};

export default Info;