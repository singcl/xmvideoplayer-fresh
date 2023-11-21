import { feedbackCollection } from "xmvideoplayer/internal/mongodb/schema/feedback.ts";
import type { DbClient } from "xmvideoplayer/internal/mongodb/db.ts";

export async function feedbackList(db: DbClient, options: { page: CamelPage }) {
  const { page } = options;
  const collection = feedbackCollection(db);
  const count = await collection.countDocuments();
  const docs = await collection.aggregate([
    {
      $sort: { create_time: -1 },
    },
    {
      $skip: (page.pageNo - 1) * page.pageSize,
    },
    {
      $limit: page.pageSize,
    },
  ]);
  return {
    ...page,
    total: count,
    list: docs,
  };
}
