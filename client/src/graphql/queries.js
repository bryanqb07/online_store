import gql from "graphql-tag";

export const FETCH_PRODUCTS = gql`
  {
    products{
      id,
      name,
      description,
      price
    }
  }
`;

export const FETCH_PRODUCT = gql`
  query FetchProduct($id: ID!){
    product(id: $id){
      id,
      name,
      description,
      weight,
      price
    }
  }
`;

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  } 
`;

export const FETCH_CART_ITEMS = gql`
  query FetchCartItems{
    cart @client
  }
`;

export const FETCH_CATEGORIES = gql`
  {
    categories{
      id,
      name
    }
  }
`;

export const FETCH_CATEGORY = gql`
  query FetchCategory($id: ID!){
    category(id: $id){
      id,
      name,
      products{
        id,
        name,
        description,
        price
      }
    }
  }
`;