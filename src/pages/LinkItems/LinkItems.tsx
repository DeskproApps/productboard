import { useNavigate } from 'react-router-dom';
import { HorizontalDivider, LoadingSpinner, TwoButtonGroup } from '@deskpro/app-sdk';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@deskpro/deskpro-ui';
import { Container, InputSearch, Items } from '@/components';
import { doNothing } from '@/utils';
import { Item } from '@/types';

interface LinkItems {
    items: Item[];
    selectedItemIDs: Item['id'][];
    onItemSelectionChange: (item: Item) => void;
    onLinkTasks: () => void;
    isLoading: boolean;
    isSubmitting: boolean;
};

function LinkItems({
    items,
    selectedItemIDs,
    onItemSelectionChange,
    onLinkTasks,
    isLoading,
    isSubmitting
}: LinkItems) {
    const navigate = useNavigate();

    const navigateToCreateItemPage = () => {
        navigate('/create_item');
    };

    return (
        <Container>
            <TwoButtonGroup
                oneLabel='Find Item'
                oneIcon={faSearch}
                oneOnClick={doNothing}
                twoLabel='Create Item'
                twoIcon={faPlus}
                twoOnClick={navigateToCreateItemPage}
                selected='one'
            />
            <InputSearch
                value=''
                onChange={() => {}}
                onClear={() => {}}
            />
            <Button
                text={`Link Item${selectedItemIDs.length !== 1 ? 's' : ''}`}
                disabled={isSubmitting}
                onClick={onLinkTasks}
            />
            <HorizontalDivider
                style={{marginTop: '10px', marginBottom: '10px'}}
            />
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <Items
                    items={items}
                    selectedItemIDs={selectedItemIDs}
                    onItemSelectionChange={onItemSelectionChange}
                />
            )}
        </Container>
    );
};

export default LinkItems;