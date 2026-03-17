import type { RequestHandler } from "./$types";
import {db} from "$lib/db";
import { error } from "console";

export const PUT: RequestHandler = async ({ request }) => {
    const body = await request.json();
    const { id, text } = body;

    if (!text || !id) {
        return new Response(JSON.stringify({ error: "not found" }) , {
            status: 400
        });
    }

    const stmt = db.prepare("UPDATE todos SET text = ? WHERE id = ?");
    const result = stmt.run(text, id);

    if (result.changes === 0) {
        return new Response(JSON.stringify({ error: "not found" }), {
            status: 400
        });
    }


    return new Response(
        JSON.stringify({
            id,
            text,
            done: 0
        }),
        { status: 200}
    );
};