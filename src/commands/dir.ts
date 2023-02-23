import { Args, Command, Flags } from "@oclif/core";
import DirectoryService from "../services/directoryService";

export default class Dir extends Command {
  static description = "describe the command here";

  static examples = ["<%= config.bin %> <%= command.id %>"];

  static flags = {};

  static args = {
    name: Args.string({
      description: "Name of directory to change to",
      required: true,
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Dir);
    const service = new DirectoryService();

    const result = await service.readAsync(args.name);

    if (result === undefined) {
      this.log(`name '${args.name}' does not exist`);
      return;
    }

    //TODO: solution for changing directory of terminal
  }
}
