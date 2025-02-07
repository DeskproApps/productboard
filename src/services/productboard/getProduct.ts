import { IDeskproClient } from '@deskpro/app-sdk';
import baseRequest from './baseRequest';
import { Product } from '@/types';

interface GetProductResponse {
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

async function getProduct({ id, client }: GetProduct): Promise<Product> {
    try {
        const response: GetProductResponse = await baseRequest<GetProductResponse>({
            client,
            endpoint: `/products/${id}`
        });

        if (!response.data) throw new Error('no products');

        const product = response.data;

        return {
            id: product.id,
            name: product.name,
            link: product.links.html
        };
    } catch (error: any) {
        console.log('error getting products:', error);

        return {
            id: '',
            name: '',
            link: ''
        };
    };
};

export default getProduct;