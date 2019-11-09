import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { FETCH_CART_ITEMS } from "../../graphql/queries";
import { Query } from "react-apollo";
import CartItem from "../cart/CartItem";

function ProductsIndex() {
    return (
        <Query query={FETCH_CART_ITEMS}>
            {({ loading, error, data }) => {
                if (loading) return "Loading..."
                if (error) return `Error! ${error.message}`;

                return (
                    <ul>
                        {
                            data.cart.map(cartItem => (
                                <li key={cartItem.id}>
                                    <CartItem cartItem={cartItem} />
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
