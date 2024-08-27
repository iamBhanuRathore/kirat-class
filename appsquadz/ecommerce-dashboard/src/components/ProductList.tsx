import React from "react";
import { Grid } from "@mui/material";
import ProductItem from "./ProductItem";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  tags: string[];
  brand?: string;
  images: string[];
}

interface Props {
  products: Product[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <ProductItem product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
