import { useNavigate } from 'react-router-dom';
import { TwoButtonGroup } from '@deskpro/app-sdk';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Container } from '@/components';
import { doNothing } from '@/utils';

function CreateItemPage() {
    const navigate = useNavigate();

    const navigateToLinkItemsPage = () => {
        navigate('/link_items');
    };

    return (
        <Container>
            <TwoButtonGroup
                oneLabel='Find Item'
                oneIcon={faSearch}
                oneOnClick={navigateToLinkItemsPage}
                twoLabel='Create Item'
                twoIcon={faPlus}
                twoOnClick={doNothing}
                selected='two'
            />
        </Container>
    );
};

export default CreateItemPage;