import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { FETCH_CATEGORIES } from "../../graphql/queries";
import { CREATE_CATEGORY } from "../../graphql/mutations";

class CreateCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            name: ""
        };
    }

    updateCache(cache, { data }) {
        let categories;
        try {
            // if we've already fetched the categories then we can read the
            // query here
            categories = cache.readQuery({ query: FETCH_CATEGORIES })
        } catch (err) {
            return;
        }
        // if we had previously fetched categories we'll add our new product to our cache
        if (categories) {
            let categoryArray = categories.categories;
            let newCategory = data.newCategory;
            cache.writeQuery({
                query: FETCH_CATEGORIES,
                data: { categories: categoryArray.concat(newCategory) }
            })
        }
    }

    handleSubmit(e, newCategory) {
        e.preventDefault();
        newCategory({
            variables: {
                name: this.state.name
            }
        })
    }

    render() {
        return (
            <Mutation
                mutation={CREATE_CATEGORY}
                onError={err => this.setState({ message: err.message })}
                // update cache on product creation
                update={(cache, data) => this.updateCache(cache, data)}
                onCompleted={data => {
                    const { name } = data.newCategory;
                    this.setState({
                        message: `New category ${name} created successfully`
                    })
                }
                }
            >
                {(newCategory, { data }) => (
                    <div>
                        <form onSubmit={e => this.handleSubmit(e, newCategory)}>
                            <input
                                onChange={e => this.setState({ name: e.target.value })}
                                value={this.state.name}
                                placeholder="Name"
                            />
                            <button type="submit">Create Category</button>
                        </form>
                        <p>{this.state.message}</p>
                    </div>
                )}
            </Mutation>
        )
    }
}

export default CreateCategory;