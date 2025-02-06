import { NoFound } from '@/components';
import Item from './Item';
import { Item as ItemType } from '@/types';

interface Items {
    items: ItemType[];
    selectedItemIDs: ItemType['id'][];
    onItemSelectionChange: (item: ItemType) => void;
};

function Items({
    items,
    selectedItemIDs,
    onItemSelectionChange
}: Items) {
    if (!Array.isArray(items)) return <NoFound />
    
    if (items.length === 0) return <NoFound text='No ProductBoard Items Found' />

    return (
        <>
            {items.map(item => (
                <Item
                    key={item.id}
                    item={item}
                    checked={selectedItemIDs.some(ID => item.id === ID)}
                    onChange={() => onItemSelectionChange(item)}
                />
            ))}
        </>
    );
};

export default Items;