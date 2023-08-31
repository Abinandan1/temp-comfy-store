import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { all_products, filtered_products, grid_view } = useFilterContext();
  if (filtered_products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search...
      </h5>
    );
  }
  if (!grid_view) {
    return <ListView products={filtered_products}></ListView>;
  }
  return <GridView products={filtered_products}></GridView>;
};

export default ProductList;
