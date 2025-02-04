import { Context, IDeskproClient } from '@deskpro/app-sdk';
import { Settings } from '@/types';
import baseRequest from './baseRequest';

interface GetObjectives {
    client: IDeskproClient;
    context: Context<unknown, Settings>;
};

async function getObjectives({ client, context }: GetObjectives) {
    try {
        const data = await baseRequest({
            client,
            context,
            endpoint: '/objectives'
        });

        console.log(data);

        return data;
    } catch (error: any) {
        console.log('error getting access and refresh tokens', error);
    };
};

export default getObjectives;