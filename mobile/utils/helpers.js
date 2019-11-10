import gql from "graphql-tag";

export const GET_PROJECTS = gql`
  query projects {
    projects {
      id
      color
      category
      name
    }
  }
`;

export const GET_ME_QUERY = gql`
  query getMe {
    me {
      firstName
      lastName
      profilePictureUrl
      following {
        firstName
        lastName
        submissions {
         id
          dateSubmitted
          name
          likes
          project {
            id
            name
          }
        }
      }
    }
  }
`;


export const GET_PROJECT_QUERY= gql`
  query showProject($id: String!) {
    project(id: $id) {
      name
      category
      color
      deadline
      submissions {
        user {
          id
          firstName
          lastName
        }
      }
      resources {
        id
        description
        url
        color
        type
      }
    }
  }
`;
