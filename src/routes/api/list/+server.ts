import type { RequestHandler } from "./$types";
import { db } from "$lib/db";

export const GET: RequestHandler = async ()  => {
    const stmt = db.prepare("SELECT * FROM todos");
    const result = stmt.all();

    return new Response(JSON.stringify(result), { status: 200 });

}