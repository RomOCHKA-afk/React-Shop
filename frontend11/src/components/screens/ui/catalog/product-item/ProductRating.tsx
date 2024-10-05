import React, { FC, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { IProduct } from '@/types/product.interface';
import { useQuery } from '@tanstack/react-query';
import { ReviewService } from '@/services/product/review.service';

interface RatingData {
  rating?: number; // Making rating property optional
}

const ProductRating: FC<{ product: IProduct }> = ({ product }) => {
  const [rating, setRating] = useState(
    Math.round(
      product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    ) || 0
  );

  return (
    <div>
      <span>Review:</span>
      <Rating
        readonly
        initialValue={rating || 0} // Access rating property or provide a default value
        SVGstyle={{ display: 'inline-block' }}
        size={34}
        allowFraction
        transition
      />
      <span>({product.reviews.length} reviews)</span>
    </div>
  );
};

export default ProductRating;
