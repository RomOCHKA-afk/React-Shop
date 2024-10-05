import { FC } from 'react';
import Heading from '../ui/Heading';
import Meta from '../ui/Meta';
import { TypePaginationProducts, TypeProducts } from '@/types/product.interface';
import Catalog from '../ui/catalog/Catalog';

const Home: FC<TypePaginationProducts> = ({ products, length }) => {
    return (
        <Meta title='Home'>
            <Catalog title='Freshed products' products={products || []} />
        </Meta>
    );
};

export default Home;
