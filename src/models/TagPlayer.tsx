class TagPlayer {
    public readonly id: number;
    public readonly overwatchName: string;
    public readonly discordName: string;


    constructor(id: number, overwatchName: string, discordName: string) {
        this.id = id;
        this.overwatchName = overwatchName;
        this.discordName = discordName;
    }
}

export function tagPlayerEqual(option: TagPlayer, value: TagPlayer): boolean {
    return option.id === value.id;
}

export default TagPlayer;