import type { Handlers } from "$fresh/server.ts";
import type { DbClient } from "xmvideoplayer/internal/mongodb/db.ts";
import { z } from "zod/mod.ts";
import * as feedbackService from "xmvideoplayer/internal/service/feedback/index.ts";
import { CodeResponse } from "xmvideoplayer/internal/code/code.ts";

interface DbState {
  mongodb: DbClient;
}

export const handler: Handlers<unknown, DbState> = {
  async POST(req, ctx) {
    try {
      const body = await req.json();
      const feedback = z.object({
        page: z.object({
          pageNo: z.number(),
          pageSize: z.number(),
        }),
      });

      const data = feedback.parse(body);
      if (!ctx.state?.mongodb) {
        return CodeResponse.responseJson("ServerError", undefined, {
          status: 500,
        });
      }

      const res = await feedbackService.list.feedbackList(ctx.state.mongodb, data);
      return CodeResponse.responseJson("Success", res);
    } catch (e) {
      console.error("参数错误:", e);
      return CodeResponse.responseJson("ParamBindError");
    }
  },
};
