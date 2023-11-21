import { feedbackCollection } from "xmvideoplayer/internal/mongodb/schema/feedback.ts";
import type { DbClient } from "xmvideoplayer/internal/mongodb/db.ts";

export async function feedbackList(db: DbClient, options: { page: CamelPage }) {
  const { page } = options;
  const collection = feedbackCollection(db);
  const count = await collection.countDocuments();
  const docs = await collection.aggregate([
    {
      $skip: (page.pageNo - 1) * page.pageSize,
    },
    {
      $limit: page.pageSize,
    },
    {
      $sort: { create_time: -1 },
    },
  ]);
  return {
    ...page,
    total: count,
    list: docs,
  };
}
