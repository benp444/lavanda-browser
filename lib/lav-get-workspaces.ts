import { graphqlFetch } from "./lav-graphql-client"


export async function getWorkspaces() {

  console.log("in /lib/getWorkspaces")

  const query = `query Spaces {
    spaces {
        buildings {
            nodes {
                id
                name
                workspace {
                    id
                }
            }
        }
    }
}`
  const workspaces = await graphqlFetch(query);
  console.log("getWorkspaces: DATA TYPE:", typeof workspaces)
  console.log("getWorkspaces:IS ARRAY:", Array.isArray(workspaces))
  console.log("getWorkspaces: DATA:", workspaces)
  console.log("getWorkspaces: JSON:", JSON.stringify(workspaces, null, 2));
  //console.log("keys:", Object.keys(workspaces))

  return workspaces;


  //return graphqlFetch(query);
}