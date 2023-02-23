import { database } from "..";

export type DirectoryRecord = {
  name: string;
  path: string;
};

export default class DirectoryService {
  public async addAsync(name: string, path: string): Promise<void> {
    const sql = "INSERT INTO directory(name, path) VALUES ($name, $path)";

    return new Promise<void>((res, rej) => {
      database.run(sql, { $name: name, $path: path }, (err) => {
        if (err) {
          err.message.startsWith("SQLITE_CONSTRAINT")
            ? rej(new Error(`A directory with name '${name}' already exists`))
            : rej(err);
        }
        res();
      });
    });
  }

  public async readAsync(name: string): Promise<DirectoryRecord | undefined> {
    const sql = "SELECT d.name, d.path FROM directory d WHERE d.name = $name";

    return new Promise<DirectoryRecord | undefined>((res, rej) => {
      database.get(sql, { $name: name }, (err, row) => {
        if (err) rej(err);
        res(row);
      });
    });
  }

  public async readAllAsync(): Promise<DirectoryRecord[]> {
    const sql = "SELECT d.name, d.path FROM directory d";

    return new Promise<DirectoryRecord[]>((res, rej) => {
      database.all(sql, (err, rows) => {
        if (err) rej(err);
        res(rows);
      });
    });
  }

  public async deleteAsync(name: string): Promise<void> {
    const sql = "DELETE FROM directory WHERE name = $name";

    return new Promise<void>((res, rej) => {
      database.run(sql, { $name: name }, (err) => {
        if (err) {
          rej(err);
        }
        res();
      });
    });
  }

  public async deleteAllAsync(): Promise<void> {
    const sql = "DELETE FROM directory";

    return new Promise<void>((res, rej) => {
      database.run(sql, (err) => {
        if (err) {
          rej(err);
        }
        res();
      });
    });
  }

  public async updateAsync(
    name: string,
    record: DirectoryRecord
  ): Promise<DirectoryRecord> {
    const sql =
      "UPDATE directory d SET d.name = $name, d.path = $path WHERE d.name = $oldName;" +
      "SELECT d.name, d.path FROM directory WHERE d.name = $name;";

    return new Promise<DirectoryRecord>((res, rej) => {
      database.get(
        sql,
        { $oldName: name, $name: record.name, $path: record.path },
        (err, row) => {
          if (err) {
            rej(err);
          }
          res(row);
        }
      );
    });
  }
}
