import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ products, ...props }: any) => {
  return (
    <ul>
      {products.map((p: any) => (
        <ProductItem key={p.id} product={p} {...props} />
      ))}
    </ul>
  );
};

export default ProductList;