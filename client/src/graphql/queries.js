import gql from "graphql-tag";

export const FETCH_PRODUCTS = gql`
  {
    products{
      id,
      name
    }
  }
`;