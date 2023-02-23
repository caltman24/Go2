import { Args, Command, Flags } from "@oclif/core";
import DirectoryService from "../services/directoryService";

export default class Clear extends Command {
  static description = "remove saved directories";

  static examples = ["<%= config.bin %> <%= command.id %>"];

  static flags = {
    clearAll: Flags.boolean({
      char: "a",
      aliases: ["all"],
      default: false,
      description: "Clear all saved directories",
    }),
  };

  static args = {
    name: Args.string({ description: "Name of directory to remove" }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Clear);
    const service = new DirectoryService();

    if (args.name === undefined && flags.clearAll === true) {
      service.deleteAllAsync();
      this.log(`All saved directories removed`);
      return;
    }

    if (args.name === undefined) {
      this.log("name is required if the all flag is false");
      return;
    }

    if (service.readAsync(args.name) === undefined) {
      this.log(`A directory with name '${args.name}' does not exist`);
      return;
    }

    service.deleteAsync(args.name);
    this.log(`${args.name} removed`);
  }
}
