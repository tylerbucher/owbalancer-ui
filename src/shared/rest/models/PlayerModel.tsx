export interface PlayerModelApi {
    id: number;
    names: Array<number>;
    userId: string;
    tankPreference: number;
    supportPreference: number;
    dpsPreference: number;
    tankSr: number;
    supportSr: number;
    dpsSr: number;
}

export class PlayerModel {

    public id: number;
    public names: Array<number>;
    public userId: string;
    public tankPreference: number;
    public supportPreference: number;
    public dpsPreference: number;
    public tankSr: number;
    public supportSr: number;
    public dpsSr: number;

    constructor(id: number,
                names: Array<number>,
                userId: string,
                tankPreference: number,
                supportPreference: number,
                dpsPreference: number,
                tankSr: number,
                supportSr: number,
                dpsSr: number) {
        this.id = id;
        this.names = names;
        this.userId = userId;
        this.tankPreference = tankPreference;
        this.supportPreference = supportPreference;
        this.dpsPreference = dpsPreference;
        this.tankSr = tankSr;
        this.supportSr = supportSr;
        this.dpsSr = dpsSr;
    }
}