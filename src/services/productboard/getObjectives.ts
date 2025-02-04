import { Context, IDeskproClient } from '@deskpro/app-sdk';
import baseRequest from './baseRequest';
import { Objective, Settings } from '@/types';

interface GetObjectives {
    client: IDeskproClient;
    context: Context<unknown, Settings>;
};

async function getObjectives({ client, context }: GetObjectives): Promise<Objective[]> {
    try {
        let objectives = [];
        let nextPage: string | null = '/objectives';

        while (nextPage) {
            const response = await baseRequest({
                client,
                context,
                endpoint: nextPage
            });

            objectives.push(response.data);

            const nextLink = response.links?.next;

            if (nextLink) {
                const next = new URL(nextLink);

                nextPage = next.pathname + next.search;
            } else {
                nextPage = null;
            };
        };

        return objectives.flat();
    } catch (error: any) {
        console.log('error getting access and refresh tokens', error);

        return [];
    };
};

export default getObjectives;