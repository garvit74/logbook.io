import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsBlogsConnection {
        edges {
          node {
            author {
              description
              id
              name
              photo {
                url
              }
            }
            createdAt
            slugs
            title
            descriptions
            image {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.postsBlogsConnection.edges;
};
