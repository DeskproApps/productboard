import { useNavigate } from 'react-router-dom';
import { HorizontalDivider, LoadingSpinner, TwoButtonGroup } from '@deskpro/app-sdk';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@deskpro/deskpro-ui';
import { Container, InputSearch, Items } from '@/components';
import { doNothing } from '@/utils';
import { Item } from '@/types';

interface LinkItems {
    items: Item[];
    isLoading: boolean;
};

function LinkItems({
    items,
    isLoading
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
                text='Link Items'
                disabled={false}
                onClick={() => {}}
            />
            <HorizontalDivider
                style={{marginTop: '10px', marginBottom: '10px'}}
            />
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <Items
                    items={items}
                    onChange={() => {}}
                />
            )}
        </Container>
    );
};

export default LinkItems;