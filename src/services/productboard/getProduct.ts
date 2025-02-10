import { IDeskproClient } from '@deskpro/app-sdk';
import baseRequest from './baseRequest';
import { Product } from '@/types';

type GetProductResponse = {
    data: {
        id: string;
        name: string;
        links: {
            html: string;
        };
    };
};

interface GetProduct {
    id: string;
    client: IDeskproClient;
};

async function getProduct({ id, client }: GetProduct): Promise<Product | undefined> {
    try {
        const response: GetProductResponse = await baseRequest<GetProductResponse>({
            client,
            endpoint: `/products/${id}`
        });

        if (!response.data) throw new Error('no product');

        const product = response.data;

        return {
            id: product.id,
            name: product.name,
            link: product.links.html
        };
    } catch (error: any) {
        console.log('error getting product:', error);

        return undefined;
    };
};

export default getProduct;