import React from "react";
import { Link } from 'react-router-dom';
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
                <li key={product.id}>
                  <div>
                    <span>Name: {product.name}</span>
                    <br />
                    <span>Description: {product.description}</span>
                    <br />
                    <span>Price: ${product.price}</span>
                    <br />
                    <Link to={"/products/" + product.id}>View Product</Link>
                  </div>
                </li>
              ))
            }
          </ul>
        )
      }}
    </Query>
  );
}

export default ProductsIndex;
