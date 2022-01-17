import { BaseCommandInteraction, Client, ClientOptions } from "discord.js";
/**
 * mao's Client wrapper that contains defaults, and mappings.
 */
export default class Mao extends Client {
    private static instance;
    static defaultPrefix: string;
    private commands;
    constructor(options?: ClientOptions);
    handleSlashCommand(command: BaseCommandInteraction): Promise<void>;
    /**
     * Mao acts as a Singleton, and this is its getter.
     * @returns Singleton instance of {@link Mao}
     */
    static getInstance(): Mao;
}
