import React from "react";
import { Link } from 'react-router-dom';
import { FETCH_PRODUCT } from "../../graphql/queries";
import { Query } from "react-apollo";
import AddItemToCart from "./AddToCart";

function ProductDetail(props) {
    return (
        <Query query={FETCH_PRODUCT} variables={ props.match.params }>
            {({ loading, error, data }) => {
                if (loading) return "Loading..."
                if (error) return `Error! ${error.message}`;

                const product = data.product;
                return (
                    <div>
                        <span>Name: {product.name}</span>
                        <br />
                        <span>Description: {product.description}</span>
                        <br />
                        <span>Price: ${product.price}</span>
                        <br />
                        <AddItemToCart price={product.price} id={product.id} />
                        <br />
                        <Link to={"/cart/checkout"}>Checkout</Link>
                    </div>
                )
            }}
        </Query>
    );
}

export default ProductDetail;