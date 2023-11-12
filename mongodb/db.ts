import { MongoClient } from "atlassdk/mod.ts";
// https://www.mongodb.com/developer/languages/rust/getting-started-deno-mongodb/
export interface DdConfigOptions {
  apiKey: string;
  dataSource: string;
  endpoint: string;
}

export class DbClient extends MongoClient {
  protected static client: DbClient;
  private constructor(options: DdConfigOptions) {
    console.log("----mongodb:", "mount mongodb");
    if (DbClient.client) {
      const error = new Error(
        "Error - Please use DbClient.create() create DbClient instance"
      );
      error.cause = "build_class_instance";
      throw error;
    }
    const { apiKey, dataSource, endpoint } = options;
    if (!apiKey || !dataSource || !endpoint) {
      const error = new Error(
        "Neither endpoint, nor dataSource, apiKey are defined"
      );
      error.cause = "missing_configuration_properties";
      throw error;
    }
    super({
      endpoint,
      dataSource,
      auth: {
        apiKey,
      },
    });
  }

  public static create(options: DdConfigOptions) {
    if (!DbClient.client) {
      DbClient.client = new DbClient(options);
    }
    return DbClient.client;
  }
}
