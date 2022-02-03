/** @format */
import { Client, ClientOptions } from "discord.js";
export default class Mao extends Client {
    private static instance;
    static PREFIX: string;
    constructor(options?: ClientOptions);
}
