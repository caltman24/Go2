import { Args, Command, Flags } from "@oclif/core";
import DirectoryService from "../services/directoryService";

export default class Test extends Command {
  static description = "describe the command here";

  static examples = ["<%= config.bin %> <%= command.id %>"];

  static flags = {};

  static args = {
    name: Args.string({ required: true }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Test);
    const service = new DirectoryService();

    const result = await service.readAsync(args.name);

    console.log(result);
  }
}
