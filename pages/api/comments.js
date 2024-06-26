import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmstoken = process.env.GRAPHCMS_TOKEN;

export default async function asynchandler(req, res) {

  const {name, email, slug, comment} = req.body;  
  const graphQLClient = new GraphQLClient((graphqlAPI), {
      headers: {
        authorization: `Bearer ${graphcmstoken}`,
      },
    });
  
    const query = gql`
      mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
        createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
      }
    `;
    const result = await graphQLClient.request(query, req.body);
  
    return res.status(200).send(result);
}