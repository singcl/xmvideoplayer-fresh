import { MongoClient } from "atlassdk/mod.ts";

export interface FeedbackUpdateSchema {
  email: string;
  message: string;
  uid: string;
  create_time: Date;
}

export function feedbackCollection(client: MongoClient) {
  const db = client.database("xm_video_player");
  const feedback = db.collection<FeedbackUpdateSchema>("feedback");
  return feedback;
}
