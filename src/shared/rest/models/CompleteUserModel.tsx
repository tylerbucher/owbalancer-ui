export interface CompleteUserModelApi {
    id: number;
    username: string;
    tankPreference: number;
    dpsPreference: number;
    supportPreference: number;
    tankSr: number;
    dpsSr: number;
    supportSr: number;
    totalPref: number;
    owNames: Array<string>;
}

export class CompleteUserModel implements CompleteUserModelApi {

    public id: number;
    public username: string;
    public tankPreference: number;
    public dpsPreference: number;
    public supportPreference: number;
    public tankSr: number;
    public dpsSr: number;
    public supportSr: number;
    public totalPref: number;
    public owNames: Array<string>;

    constructor(input?: string) {
        if (input === undefined) {
            this.id = -1;
            this.username = "";
            this.tankPreference = -1;
            this.dpsPreference = -1;
            this.supportPreference = -1;
            this.tankSr = -1;
            this.dpsSr = -1;
            this.supportSr = -1;
            this.totalPref = -1;
            this.owNames = new Array<string>();
        } else {
            let obj = JSON.parse(input);
            this.id = obj.userInfo.id;
            this.username = obj.userInfo.name;
            this.tankPreference = obj.userInfo.tankPreference;
            this.dpsPreference = obj.userInfo.dpsPreference;
            this.supportPreference = obj.userInfo.supportPreference;
            this.tankSr = obj.userInfo.tankSr;
            this.dpsSr = obj.userInfo.dpsSr;
            this.supportSr = obj.userInfo.supportSr;
            this.totalPref = obj.userInfo.totalPref;
            this.owNames = obj.owNames;
        }
    }
}