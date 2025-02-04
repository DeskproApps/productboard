import { useSetTitle } from '@/hooks';
import LinkItems from './LinkItems';

function LinkItemsPage() {

    useSetTitle('Link Items');

    return (
        <LinkItems />
    );
};

export default LinkItemsPage;