import { MongoClient } from "atlassdk/mod.ts";
// https://www.mongodb.com/developer/languages/rust/getting-started-deno-mongodb/
export interface DdConfigOptions {
  apiKey: string;
  dataSource: string;
  endpoint: string;
}

export class DbBuilder {
  client: MongoClient | null = null;

  constructor(options: DdConfigOptions) {
    const { apiKey, dataSource, endpoint } = options;
    if (!apiKey || !dataSource || !endpoint) {
      const error = new Error(
        "Neither endpoint, nor dataSource, apiKey are defined"
      );
      error.cause = "missing_configuration_properties";
      throw error;
    }
    if (!this.client) {
      console.log("----mongodb:", "mount mongodb");
      this.client = new MongoClient({
        endpoint,
        dataSource, // e.g. "Cluster0"
        auth: {
          apiKey,
        },
      });
    }
  }

  static create(options: DdConfigOptions) {
    return new DbBuilder(options);
  }
}
