import React, { Component } from "react";
import { FETCH_PRODUCTS } from "../../graphql/queries";
import { Query } from "react-apollo";

function ProductsIndex() {
  return (
    <Query query={FETCH_PRODUCTS}>
      {({ loading, error, data}) => {
        if (loading) return "Loading..."
        if (error) return `Error! ${error.message}`;

        return(
          <ul>
            { 
              data.products.map(product => (
                <li key={product.id}>{product.name}</li>
              ))
            }
          </ul>
        )
      }}
    </Query>
  );
}

export default ProductsIndex;
