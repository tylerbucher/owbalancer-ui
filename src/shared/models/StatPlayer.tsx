class StatPlayer {
    public readonly uuid: string;
    public readonly name: string;
    public readonly tankPreference: number;
    public readonly dpsPreference: number;
    public readonly supportPreference: number;
    public readonly tankSr: number;
    public readonly dpsSr: number;
    public readonly supportSr: number;
    public readonly totalPref: number;


    constructor(uuid: string, name: string, tankPreference: number, dpsPreference: number,
                supportPreference: number, tankSr: number, dpsSr: number, supportSr: number, totalPref: number) {
        this.uuid = uuid;
        this.name = name;
        this.tankPreference = tankPreference;
        this.dpsPreference = dpsPreference;
        this.supportPreference = supportPreference;
        this.tankSr = tankSr;
        this.dpsSr = dpsSr;
        this.supportSr = supportSr;
        this.totalPref = totalPref;
    }
}

export default StatPlayer;