export default class Server {
    id: string | number;
    prefix: string;
    constructor(id: string | number, prefix?: string);
    static servers: Record<string, Server>;
    static getPrefix(id: string | number): void;
}
