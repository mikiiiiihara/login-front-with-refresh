import { gql } from "@apollo/client";

export const GET_USER = gql`
  query user {
    user(where: { email: { equals: "test@example.com" } }) {
      id
      email
      name
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation refreshToken {
    refreshToken {
      accessToken
    }
  }
`;

export const LOGIN = gql`
  mutation login {
    login(
      loginUserInput: { email: "test@example.com", password: "password12345" }
    ) {
      accessToken
      refreshToken
    }
  }
`;
