import { Args, Command, Flags } from "@oclif/core";
import DirectoryService from "../services/directoryService";
import { logAsTable } from "../helpers/tableHelper";
import { normalize } from "upath";

export default class Save extends Command {
  static description = "Save directory. Defaults to current working directory";

  static examples = ["<%= config.bin %> <%= command.id %>"];

  static flags = {
    path: Flags.directory({
      char: "p",
      default: process.cwd(),
      aliases: ["dir", "directory"],
      description: "Path to be saved. Defaults to current working directory",
    }),
  };

  static args = {
    name: Args.string({
      description: "name of saved directory",
      required: true,
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Save);
    const { name } = args;
    const { path } = flags;

    const service = new DirectoryService();
    const normalizedPath = normalize(path);

    try {
      await service.addAsync(name, normalizedPath);
      logAsTable([{ name, path }]);
    } catch (err: any) {
      this.log(err.message);
    }
  }
}
