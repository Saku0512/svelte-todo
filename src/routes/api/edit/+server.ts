import type { RequestHandler } from "./$types";
import {db} from "$lib/db";
import { error } from "console";

export const PUT: RequestHandler = async ({ request }) => {
    const body = await request.json();
    const { text } = body;

    if (!text) {
        return new Response(JSON.stringify({ error: "text required" }) , {
            status: 400
        });
    }

    const stmt = db.prepare("UPDATE todos SET text = ?");
    const result = stmt.run(text);

    return new Response(
        JSON.stringify({
            id: result.lastInsertRowid,
            text,
            done: 0
        }),
        { status: 200}
    );
};