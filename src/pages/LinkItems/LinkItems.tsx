import { useEffect, useState } from 'react';
import { TwoButtonGroup, useDeskproAppClient, useDeskproLatestAppContext } from '@deskpro/app-sdk';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Container, InputSearch } from '@/components';
import { getObjectives } from '@/services';
import { Objective, Settings } from '@/types';

interface LinkItems {

};

function LinkItems({ }: LinkItems) {
    const { client } = useDeskproAppClient();
    const { context } = useDeskproLatestAppContext<unknown, Settings>();
    const [objectives, setObjectives] = useState<Objective[]>([])

    useEffect(() => {
        if (client && context) {
            getObjectives({ client, context })
                .then(setObjectives);
        };

    }, [client, context]);

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
            {
                objectives.map(o => <p>o</p>)
            }
        </Container>
    );
};

export default LinkItems;