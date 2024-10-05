import { IProduct } from '@/types/product.interface';
import { FC } from 'react';
import Image from 'next/image';
import AddToCartButton from './AddToCartButton';
import ProductRating from './ProductRating';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const DynamicFavoriteButton = dynamic(() => import('../FavoriteButton'), {
    ssr: false
});

const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
    return (
        <div>
            <div className='bg-white rounded-x1 relative'>
                <div className='absolute top-2 right-2 z-10'>
                <DynamicFavoriteButton productId={product.id} />
                <AddToCartButton product={product} />

                </div>
                <Image src={product.images[0]} alt={product.name} width={300} height={300} />
            </div>
            <h3 className='mb-1'>{product.name}</h3>
            <Link href={`/category/${product.category.slug}`} className='text-dark text-sm mb-2' >{product.category.name}</Link>
            <ProductRating product={product} />
            <div>{product.price}</div>
        </div>
    );
};

export default ProductItem;
