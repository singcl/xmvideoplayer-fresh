import { feedbackCollection } from "xmvideoplayer/internal/mongodb/schema/feedback.ts";
import type { DbClient } from "xmvideoplayer/internal/mongodb/db.ts";

export function feedbackList(db: DbClient) {
  const collection = feedbackCollection(db);
  return collection.find();
}
