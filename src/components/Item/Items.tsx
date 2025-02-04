import { NoFound } from '@/components';
import Item from './Item';
import { Item as ItemType } from '@/types';

interface Items {
    items: ItemType[];
    onChange: (itemID: ItemType['id']) => void;
};

function Items({ items, onChange }: Items) {
    if (!Array.isArray(items)) return <NoFound />
    
    if (items.length === 0) return <NoFound text='No ProductBoard Items Found' />

    return (
        <>
            {items.map(item => (
                <Item
                    key={item.id}
                    item={item}
                    checked={false}
                    onChange={() => onChange(item.id)}
                />
            ))}
        </>
    );
};

export default Items;