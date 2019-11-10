import gql from "graphql-tag";

export const GET_USERS = gql`
  query users {
    users {
      id
      firstName
      lastName
      submissions {
        id
      }
    }
  }
`;

export const GET_USER = gql`
  query user($id: String!) {
    user(id: $id) {
      id
      firstName
      lastName
      email
      emailVerified
      profilePictureUrl
      dateJoined
      submissions {
        id
        dateSubmitted
        name
        url
        user {
          firstName
          lastName
          id
        }
        project {
          id
          name
        }
        likers {
          id
        }
        color
      }
      followers {
        id
        firstName
        lastName
      }
      following {
        id
        firstName
        lastName
        profilePictureUrl
      }
    }
  }
`;

export const GET_GROUPS = gql`
  query groups {
    groups {
      id
      name
      users {
        id
      }
    }
  }
`;

export const GET_PROJECTS = gql`
  query projects {
    projects {
      id
      name
      description
      category
      color
      deadline
    }
  }
`;

export const GET_ME_QUERY = gql`
  query getMe {
    me {
      id
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
          url
          user {
            firstName
            lastName
          }
          likers {
            firstName
            id
          }
          project {
            id
            name
          }
        }
      }
    }
  }
`;

export const GET_PROJECT_QUERY = gql`
  query showProject($id: String!) {
    project(id: $id) {
      name
      description
      category
      color
      deadline
      submissions {
        id
        dateSubmitted
        name
        url
        user {
          firstName
          lastName
        }
        likers {
          firstName
        }
        project {
          id
          name
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

export const ADD_LIKE = gql`
  mutation AddLike($submission: String!) {
    addLike(submission: $submission) {
      id
    }
  }
`;
export const REMOVE_LIKE = gql`
  mutation RemoveLike($submission: String!) {
    removeLike(submission: $submission) {
      id
    }
  }
`;

export const ADD_FOLLOW = gql`
  mutation AddFollow($user: String!) {
    addFollow(user: $user) {
      id
    }
  }
`;
export const REMOVE_FOLLOW = gql`
  mutation RemoveFollow($user: String!) {
    removeFollow(user: $user) {
      id
    }
  }
`;
