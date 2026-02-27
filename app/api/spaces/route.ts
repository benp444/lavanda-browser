import { NextResponse } from "next/server";
import { getWorkspaces } from "@/lib/lav-get-workspaces"


export async function GET() {
    console.log("in routes try to get workspaces:")
    try {
        const workspaces = await getWorkspaces();
        //console.log("token is:", token)
        // console.log("spaces.routes: DATA TYPE:", typeof workspaces)
        // console.log("spaces.routes:IS ARRAY:", Array.isArray(workspaces))
        // console.log("spaces.routes: DATA:", workspaces)

        // console.log("spaces.routes: DATA:",JSON.stringify(workspaces, null, 2));


        return NextResponse.json(workspaces );
    } catch (error: any) {
        console.error("Error fetching productGroups:", error);
        return NextResponse.json(
            { error: "Failed to get workspaces" },
            { status: 500 }
        );
    }
}