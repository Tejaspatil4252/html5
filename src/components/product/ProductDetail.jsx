// src/components/product/ProductDetail.jsx
import React from 'react';
import CFSProductDetail from './CFSProductDetail ';
import StandardProductDetail from './StandardProductDetail';

const ProductDetail = ({ product }) => {
  if (!product) return null;

  // CFS uses new design, others use old design
  return product.id === 1 ? (
    <CFSProductDetail product={product} />
  ) : (
    <StandardProductDetail product={product} />
  );
};

export default ProductDetail;