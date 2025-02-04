import { HorizontalDivider, LoadingSpinner, TwoButtonGroup } from '@deskpro/app-sdk';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Container, InputSearch } from '@/components';
import { Item } from '@/types';
import { Button } from '@deskpro/deskpro-ui';

interface LinkItems {
    items: Item[];
    isLoading: boolean;
};

function LinkItems({
    items,
    isLoading
}: LinkItems) {
    return (
        <Container>
            <TwoButtonGroup
                oneLabel='Find Item'
                oneIcon={faSearch}
                oneOnClick={() => {}}
                twoLabel='Create Item'
                twoIcon={faPlus}
                twoOnClick={() => {}}
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
                <></>
            )}
        </Container>
    );
};

export default LinkItems;