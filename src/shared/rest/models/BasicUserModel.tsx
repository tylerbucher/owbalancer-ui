export interface BasicUserModelApi {
    uuid: string;
    playerName: string;
    names: Array<string>;
}

export class BasicUserModel implements BasicUserModelApi {

    public readonly uuid: string;
    public readonly playerName: string;
    public readonly names: Array<string>;

    constructor(uuid: string, playerName: string, names: Array<string>) {
        this.uuid = uuid;
        this.playerName = playerName;
        this.names = names;
    }
}