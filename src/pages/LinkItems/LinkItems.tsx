import { TwoButtonGroup } from '@deskpro/app-sdk';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Container, InputSearch } from '@/components';

interface LinkItems {

};

function LinkItems({ }: LinkItems) {
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
        </Container>
    );
};

export default LinkItems;