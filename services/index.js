import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            author {
              description
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
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
  return result.postsConnection.edges;
};

export const getRecPost = async () => {
  const query = gql`
    query GetDetails(){
      posts(
        orderBy: createdAt_ASC
        last: 3
       ){
        title
        featuredImage{
          url
        }
        createdAt
        slug
       }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.posts;

};

export const getSimilarPost = async () => {
  const query = gql`
    query getDetails($slugs: String!, $categories: [String!]){
      posts(
        where: { slug_not: $slugs, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ){
        title
        featuredImage{
          url
        }
        createdAt
        slugs
       }
    }
  `

  const result = await request(graphqlAPI, query);
  return result.Posts;
}