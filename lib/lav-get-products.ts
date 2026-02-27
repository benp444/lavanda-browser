import { graphqlFetch } from "./lav-graphql-client"


export async function getProducts(pgId: string) {

  console.log("in /lib/getProductGroups")

//   const query = `
//     query Catalog($pgId: ID!) {
//     catalog {
//         productGroup(id: $pgId) {
//             products {
//                 nodes {
//                     id
//                     unitType {
//                         code
//                         id
//                     }
//                 }
//             }
//         }
//     }
// }`;

  const query = `
    query Catalog($pgId: ID!) {
    catalog {
        productGroup(id: $pgId) {
            products {
                nodes {
                    id
                    unitType {
                        code
                        id
                    }
                    allocatedUnits {
                        totalCount
                    }
                }
            }
        }
    }
}`;


  //const workspaces = await graphqlFetch(query);
  //const data = await graphqlFetch<{ catalog: { productGroups: { nodes: any[] } } }>(query, { pgId });
  // console.log("Product Groups for workspace", wsId, data.catalog.productGroups.nodes);

  const data = await graphqlFetch<{
    catalog: {
      productGroup: {
        products: {
          nodes: any[];
        };
      };
    };
  }>(query, { pgId });
  console.log("getProducts: DATA TYPE:", typeof data)
  console.log("getProducts:IS ARRAY:", Array.isArray(data))
  console.log("getProducts: DATA:", data)
  console.log("getProducts: JSON:", JSON.stringify(data, null, 2));
  console.log("keys:", Object.keys(data))

  return data;


  //return graphqlFetch(query);
}