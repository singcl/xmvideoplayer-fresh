import type { Handlers } from "$fresh/server.ts";
import type { DbBuilder } from "xmvideoplayer/mongodb/db.ts";
import { z } from "zod/mod.ts";
import { feedbackCollection } from "xmvideoplayer/mongodb/schema/feedback.ts";

interface DbState {
  mongodb: DbBuilder;
}

export const handler: Handlers<unknown, DbState> = {
  async POST(req, ctx) {
    const uuid = crypto.randomUUID();
    try {
      const body = await req.json();
      const feedback = z.object({
        email: z.string(),
        message: z.string(),
      });

      const data = feedback.parse(body);
      if (!ctx.state?.mongodb?.client) {
        return new Response(
          JSON.stringify({
            id: uuid,
            error: "server error",
            message: "内部错误",
          }),
          {
            status: 500,
          }
        );
      }
      const collection = feedbackCollection(ctx.state.mongodb.client);
      const insertId = await collection.insertOne({
        email: data.email,
        message: data.message,
        uid: uuid,
      });
      return new Response(JSON.stringify(insertId), {
        status: 200,
      });
    } catch (e) {
      console.error("参数错误:", e);
      return new Response(
        JSON.stringify({
          id: uuid,
          error: "parameters_invalid",
          message: "参数错误",
        }),
        {
          status: 500,
        }
      );
    }
  },
};
