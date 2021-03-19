export interface BasicTagPlayerModelApi {
    uuid: string;
    names: string;
    playerName: string;
}

export class BasicTagPlayerModel implements BasicTagPlayerModelApi {

    public readonly uuid: string;
    public readonly names: string;
    public readonly playerName: string;

    constructor(uuid: string, names: string, playerName: string) {
        this.uuid = uuid;
        this.names = names;
        this.playerName = playerName;
    }

    static equals(thisObj: BasicTagPlayerModel, obj: BasicTagPlayerModel): boolean {
        return thisObj.uuid === obj.uuid;
    }
}