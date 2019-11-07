const mongoose = require("mongoose");
const graphql = require("graphql");
const axios = require("axios");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const AWSKey = require("../../../config/keys").AWSKey;

const UserType = require("./user_type");
const ProductType = require("./product_type");
const CategoryType = require("./category_type");

const User = mongoose.model("user");
const Product = mongoose.model("product");
const Category = mongoose.model("category");

const authOptions = {
    method: "GET",
    url: "https://ck1hilkpie.execute-api.us-east-2.amazonaws.com/default/generate-price",
    headers: {
        "x-api-key": AWSKey
    }
}

const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            resolve(){
                return User.find({});
            }
        },
        user: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) }},
            resolve(_, args){
                return User.findById(args.id);
            }
        },
        categories: {
            type: new GraphQLList(CategoryType),
            resolve() {
                return Category.find({});
            }
        },
        category: {
            type: CategoryType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, args) {
                return Category.findById(args.id);
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve() {
                return Product.find({}).then(products => {
                    return products.map(product => {
                        return axios(authOptions).then(res => {
                            product.price = res.data.price;
                            return product;
                        })
                    })
                })
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(_, args) {
                return Product.findById(args.id).then(product => {
                    return axios(authOptions).then(res => {
                        product.price = res.data.price;
                        return product;
                    })
                });
            }
        }
    })
});

module.exports = RootQueryType;