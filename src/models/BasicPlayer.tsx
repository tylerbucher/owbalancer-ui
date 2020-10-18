class BasicPlayer {

    public readonly id: number;
    public readonly discordName: string;
    public readonly overwatchNames: Array<string>;


    constructor(id: number, discordName: string, overwatchNames: Array<string>) {
        this.id = id;
        this.discordName = discordName;
        this.overwatchNames = overwatchNames;
    }
}

export default BasicPlayer;