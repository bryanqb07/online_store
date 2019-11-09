import React from "react";
import { FETCH_CART_ITEMS } from "../../graphql/queries";
import { Query } from "react-apollo";
import CartItem from "./CartItem";

function Cart() {
    return (
        <Query query={FETCH_CART_ITEMS}>
            {({ loading, error, data }) => {
                if (loading) return "Loading..."
                if (error) return `Error! ${error.message}`;

                return ( 
                    <ul>
                        { data.cart.length > 0 ?
                            data.cart.map(cartItem => (
                                <li key={cartItem.id}>
                                    <CartItem cartItem={cartItem} />
                                </li>
                            )) : <li>Cart is empty</li>
                        }
                    </ul>
                )
            }}
        </Query>
    );
}

export default Cart;
