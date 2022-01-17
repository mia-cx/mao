import Mao from "./mao.js";
import Server from "./server.js";
export function defineCommand(command) {
    return command;
}
export function isCommand(event) {
    let prefix = event.guild
        ? Server.servers[event.guildId]
            ? Server.servers[event.guildId].prefix
            : Mao.defaultPrefix
        : Mao.defaultPrefix;
    if (!event.content.startsWith(prefix))
        return;
    return prefix;
}
// export class CommandBuilder {
//     name: string | undefined;
//     description: string = "";
//     aliases: string[] = [];
//     executor: CommandExecutor | undefined;
//     withName(name: string): CommandBuilder {
//         this.name = name;
//         return this;
//     }
//     withDescription(description: string): CommandBuilder {
//         this.description = description;
//         return this;
//     }
//     withAliases(aliases: string[]): CommandBuilder {
//         this.aliases = aliases;
//         return this;
//     }
//     withAlias(alias: string): CommandBuilder {
//         this.aliases = [alias];
//         return this;
//     }
//     addAlias(alias: string): CommandBuilder {
//         this.aliases.push(alias);
//         return this;
//     }
//     withExecutor(executor: CommandExecutor): CommandBuilder {
//         this.executor = executor;
//         return this;
//     }
//     /**
//      * @returns new Command with the values you just entered built.
//      */
//     create(): Command {
//         if (!this.name || !this.executor)
//             throw new Error("not enough properties for a new Command");
//         return new Command(this.name, this.description ?? "", this.aliases ?? [], this.executor);
//     }
// }
