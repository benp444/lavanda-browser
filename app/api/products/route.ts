import { NextResponse } from "next/server";
import { getProducts } from "@/lib/lav-get-products"
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    console.log("in routes try to get Products:")
    try {
        const pgId = request.nextUrl.searchParams.get("pgId");

        if (!pgId) {
            return NextResponse.json({ error: "Missing pgId" }, { status: 400 });
        }

        const data = await getProducts(pgId);

        console.log("products.routes: DATA TYPE:", typeof data)
        console.log("products.routes:IS ARRAY:", Array.isArray(data))
        console.log("products-.routes: DATA:", data)
        console.log("products.routes: DATA:", JSON.stringify(data, null, 2));


        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Error fetching workspaces:", error);
        return NextResponse.json(
            { error: "Failed to get workspaces" },
            { status: 500 }
        );
    }
}