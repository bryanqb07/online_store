import React from "react";
import { Link } from 'react-router-dom';
import { FETCH_CATEGORIES } from "../../graphql/queries";
import { Query } from "react-apollo";

function CategoriesIndex() {
    return (
        <Query query={FETCH_CATEGORIES}>
            {({ loading, error, data }) => {
                if (loading) return "Loading..."
                if (error) return `Error! ${error.message}`;

                return (
                    <ul>
                        {
                            data.categories.map(category => (
                                <li key={category.id}>
                                    <div>
                                        <Link to={"/categories/" + category.id}>{category.name}</Link>
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

export default CategoriesIndex;
