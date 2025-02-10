import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HorizontalDivider, LoadingSpinner, TwoButtonGroup } from '@deskpro/app-sdk';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@deskpro/deskpro-ui';
import { Container, Items, SearchInput } from '@/components';
import { doNothing } from '@/utilities';
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
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const navigateToCreateItemPage = () => {navigate('/create_item')};

    const onSearchChange = (query: string) => {setSearchQuery(query)};

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
            <SearchInput onChange={onSearchChange} />
            <Button
                text={`Link Item${selectedItemIDs.length !== 1 ? 's' : ''}`}
                loading={isSubmitting}
                disabled={selectedItemIDs.length < 1}
                onClick={onLinkTasks}
            />
            <HorizontalDivider
                style={{marginTop: '10px', marginBottom: '10px'}}
            />
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <Items
                    items={items.filter(item => item.name.includes(searchQuery))}
                    selectedItemIDs={selectedItemIDs}
                    onItemSelectionChange={onItemSelectionChange}
                />
            )}
        </Container>
    );
};

export default LinkItems;