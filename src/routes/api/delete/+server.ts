import type { RequestHandler } from "./$types.js";
import {db} from "$lib/db";

export const DELETE: RequestHandler = async ({ request}) => {
    const body = await request.json();
    const { id } = body;

    if (!id) {
        return new Response(JSON.stringify({ error: "id required"}), {
            status: 400
        });
    }

    const stmt = db.prepare("DELETE FROM todos WHERE id = ?");
    const result = stmt.run(id);

    return new Response (
        JSON.stringify({
            text: "success"
        }),
        { status: 200}
    );
};  