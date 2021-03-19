export interface CompleteUserModelApi {
    uuid: string;
    playerName: string;
    tankPreference: number;
    dpsPreference: number;
    supportPreference: number;
    tankSr: number;
    dpsSr: number;
    supportSr: number;
    totalPref: number;
    names: Array<string>;
}

export class CompleteUserModel implements CompleteUserModelApi {

    public uuid: string;
    public playerName: string;
    public tankPreference: number;
    public dpsPreference: number;
    public supportPreference: number;
    public tankSr: number;
    public dpsSr: number;
    public supportSr: number;
    public totalPref: number;
    public names: Array<string>;

    constructor(input?: string) {
        if (input === undefined) {
            this.uuid = "";
            this.playerName = "";
            this.tankPreference = -1;
            this.dpsPreference = -1;
            this.supportPreference = -1;
            this.tankSr = -1;
            this.dpsSr = -1;
            this.supportSr = -1;
            this.totalPref = -1;
            this.names = new Array<string>();
        } else {
            let obj = JSON.parse(input);
            this.uuid = obj.uuid;
            this.playerName = obj.playerName;
            this.tankPreference = obj.tankPreference;
            this.dpsPreference = obj.dpsPreference;
            this.supportPreference = obj.supportPreference;
            this.tankSr = obj.tankSr;
            this.dpsSr = obj.dpsSr;
            this.supportSr = obj.supportSr;
            this.totalPref = this.tankPreference + this.dpsPreference + this.supportPreference;
            this.names = obj.names;
        }
    }
}