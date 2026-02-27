import { graphqlFetch } from "./lav-graphql-client"


export async function getProductGroups(wsId: string) {

    console.log("in /lib/getProductGroups")

    const query = `
    query Catalog($wsId: ID!) {
      catalog {
        productGroups(filters: { workspaceId: { in: [$wsId] } }) {
          nodes {
            id
            academicYear
            internalReference
            contractEarliestEndDate
            contractEarliestStartDate
            products {
                totalCount
            }
            agreement {
                agreementType
            }
          }
        }
      }
    }
  `;
    //const workspaces = await graphqlFetch(query);
    const data = await graphqlFetch<{ catalog: { productGroups: { nodes: any[] } } }>(query, { wsId });
    // console.log("Product Groups for workspace", wsId, data.catalog.productGroups.nodes);
    // console.log("getProductGroups: DATA TYPE:", typeof data)
    // console.log("getProductGroups:IS ARRAY:", Array.isArray(data))
    // console.log("getProductGroups: DATA:", data)
    // console.log("getProductGroups: JSON:", JSON.stringify(data, null, 2));
    //console.log("keys:", Object.keys(workspaces))

    return data;


    //return graphqlFetch(query);
}