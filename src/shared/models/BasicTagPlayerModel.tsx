export interface BasicTagPlayerModelApi {
    id: number;
    overwatchName: string;
    discordName: string;
}

export class BasicTagPlayerModel implements BasicTagPlayerModelApi {

    public readonly id: number;
    public readonly overwatchName: string;
    public readonly discordName: string;

    constructor(id: number, overwatchName: string, discordName: string) {
        this.id = id;
        this.overwatchName = overwatchName;
        this.discordName = discordName;
    }

    static equals(thisObj: BasicTagPlayerModel, obj: BasicTagPlayerModel): boolean {
        return thisObj.id === obj.id;
    }
}