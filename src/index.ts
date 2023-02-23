import { Database } from "sqlite3";
import { resolve } from "path";

export const database = new Database(
  resolve(__dirname, "./db/directory.db"),
  (err) => {
    if (err) {
      console.error(err);
      return;
    }

    if (process.env.NODE_ENV != "development") return;

    console.log("Sqlite database started\n");
  }
);

export { run } from "@oclif/core";
