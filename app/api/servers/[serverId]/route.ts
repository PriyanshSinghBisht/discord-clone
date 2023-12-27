import { CurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";



export async function DELETE(
    req: Request,
    {params}:{params: { serverId: string}}
){
    try {
        const profile = await CurrentProfile();;

        if(!profile){
            return new NextResponse("Unauthorized ", {status: 401})
        }

        const server = await db.server.delete({
            where:{
                id: params.serverId,
                profileId: profile.id,
            }
        });

        return NextResponse.json(server);

    } catch (error) {
        console.log("[SERVER_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

