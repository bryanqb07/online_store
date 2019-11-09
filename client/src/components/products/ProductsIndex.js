import React from "react";
import { Link } from 'react-router-dom';
import { FETCH_PRODUCTS } from "../../graphql/queries";
import { Query } from "react-apollo";
import ProductContainer from "./ProductContainer";

function ProductsIndex() {
  return (
    <Query query={FETCH_PRODUCTS}>
      {({ loading, error, data}) => {
        if (loading) return "Loading..."
        if (error) return `Error! ${error.message}`;

        return <ProductContainer products={data.products} />
      }}
    </Query>
  );
}

export default ProductsIndex;
