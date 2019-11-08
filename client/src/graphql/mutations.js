import gql from "graphql-tag";

export const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!){
        login(email: $email, password: $password){
            token,
            loggedIn
        }
    }
`;

export const VERIFY_USER = gql`
    mutation VerifyUser($token: String!){
        verifyUser(token: $token){
            loggedIn
        }
    }
`;

export const REGISTER_USER = gql`
    mutation RegisterUser($email: String!, $name: String!, $password: String!){
        register(email: $email, name: $name, password: $password){
            token,
            loggedIn
        }
    }
`;