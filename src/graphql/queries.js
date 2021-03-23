/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      comment
      createdAt
      updatedAt
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        comment
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchMessages = /* GraphQL */ `
  query SearchMessages(
    $filter: SearchableMessageFilterInput
    $sort: SearchableMessageSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchMessages(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        comment
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
