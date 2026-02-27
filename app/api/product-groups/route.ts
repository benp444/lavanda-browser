import { NextResponse } from "next/server";
import { getProductGroups } from "@/lib/lav-get-product-groups"
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    console.log("in routes try to get workspaces:")
    try {
        const wsId = request.nextUrl.searchParams.get("wsId");

        if (!wsId) {
            return NextResponse.json({ error: "Missing wsId" }, { status: 400 });
        }

          const data = await getProductGroups(wsId);

        console.log("token is:", data)
        console.log("product-groups.routes: DATA TYPE:", typeof data)
        console.log("product-groups.routes:IS ARRAY:", Array.isArray(data))
        console.log("product-groups.routes: DATA:", data)

        console.log("product-groups.routes: DATA:", JSON.stringify(data, null, 2));


        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Error fetching workspaces:", error);
        return NextResponse.json(
            { error: "Failed to get workspaces" },
            { status: 500 }
        );
    }
}