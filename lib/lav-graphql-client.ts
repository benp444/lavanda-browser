
import { getAccessToken } from "./lav-auth-client";

export async function graphqlFetch<T>(
    query: string,
    variables?: Record<string, any>
): Promise<T> {

    console.log("in /lib/graphqlFetch");

    const url = "https://platapi.lavanda.app/v1";

    const token = await getAccessToken();

    console.log("/lib/graphqlFetch recieved: ");


    // console.log("graphqlFetch: DATA TYPE:", typeof query)
    // console.log("graphqlFetch: IS ARRAY:", Array.isArray(query))
    // console.log("graphqlFetch: DATA:", JSON.stringify({
    //         query,
    //         variables,
    //     }))

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "x-api-client-name": "5858nonqrakj1g4nd8c32uat18",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    if (!response.ok) {
        console.log("graphqlFetch: DATA TYPE:", typeof response)
        console.log("graphqlFetch: IS ARRAY:", Array.isArray(response))
        console.log("graphqlFetch: DATA:", response)
        throw new Error(`GraphQL request failed: ${response.status}`);
    }

    const json = await response.json();

    if (json.errors) {
        console.error(json.errors);
        throw new Error("GraphQL returned errors");
    }

    return json.data;
}