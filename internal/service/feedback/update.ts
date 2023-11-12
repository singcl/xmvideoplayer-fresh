import { feedbackCollection } from "xmvideoplayer/internal/mongodb/schema/feedback.ts";
import type { FeedbackUpdateSchema } from "xmvideoplayer/internal/mongodb/schema/feedback.ts";
import type { DbClient } from "xmvideoplayer/internal/mongodb/db.ts";

export async function feedbackUpdate(
  db: DbClient,
  options: Omit<FeedbackUpdateSchema, "uid">
) {
  const collection = feedbackCollection(db);
  const uuid = crypto.randomUUID();
  const insertRes = await collection.insertOne({
    ...options,
    uid: uuid,
  });
  return {
    id: insertRes.insertedId,
  };
}
