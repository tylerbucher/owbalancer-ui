export interface BasicUserModelApi {
    id: number;
    discordName: string;
    overwatchNames: Array<string>;
}

export class BasicUserModel implements BasicUserModelApi {

    public readonly id: number;
    public readonly discordName: string;
    public readonly overwatchNames: Array<string>;

    constructor(id: number, discordName: string, overwatchNames: Array<string>) {
        this.id = id;
        this.discordName = discordName;
        this.overwatchNames = overwatchNames;
    }
}