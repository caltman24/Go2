import { Args, Command, Flags } from "@oclif/core";
import DirectoryService from "../services/directoryService";
import { logAsTable } from "../helpers/tableHelper";

export default class List extends Command {
  static description = "List all saved directories";

  static examples = ["<%= config.bin %> <%= command.id %>"];

  static flags = {};

  static args = {};

  public async run(): Promise<void> {
    const service = new DirectoryService();
    const directories = await service.readAllAsync();

    if (directories.length === 0) {
      this.log(
        "There are no saved directories" +
          "\n\nUse: go2 save [name] [-p, --path <directory>]"
      );
      return;
    }

    logAsTable(directories);
  }
}
