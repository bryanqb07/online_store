import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Query, ApolloConsumer } from "react-apollo";
import { IS_LOGGED_IN } from '../graphql/queries';

const Nav = props => {
    return (
        <ApolloConsumer>
            {client => (
                <Query query={IS_LOGGED_IN}>
                    {({ data }) => {
                        if (data.isLoggedIn) {
                            return (
                                <div>
                                    <Link to="/">Home</Link>
                                    <Link to="/cart">Cart</Link>
                                    <button
                                        onClick={e => {
                                            e.preventDefault();
                                            localStorage.removeItem("auth-token");
                                            client.writeData({ data: { isLoggedIn: false } });
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            );
                        } else {
                            return (
                                <div>
                                    <Link to="/">Home</Link>
                                    <Link to="/cart">Cart</Link>
                                    <Link to="/login">Login</Link>
                                </div>
                            );
                        }
                    }}
                </Query>
            )}
        </ApolloConsumer>
    );
};

export default Nav;