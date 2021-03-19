import {DpsRoleDefault, SupportRoleDefault, TankRoleDefault} from "../../forms/FormData";

export interface PostNewPlayerModelApi {
    userId: string;
    playerName: string;
    names: Array<string>;
    tankSr: number;
    tankPreference: number;
    dpsSr: number;
    dpsPreference: number;
    supportSr: number;
    supportPreference: number;

    reset(): void;
}

export class PostNewPlayerModel implements PostNewPlayerModelApi {
    userId: string;
    playerName: string;
    names: Array<string>;
    tankSr: number;
    tankPreference: number;
    dpsSr: number;
    dpsPreference: number;
    supportSr: number;
    supportPreference: number;

    constructor() {
        this.userId = "";
        this.playerName = "";
        this.names = new Array<string>();
        this.tankSr = -1;
        this.tankPreference = TankRoleDefault;
        this.dpsSr = -1;
        this.dpsPreference = DpsRoleDefault;
        this.supportSr = -1;
        this.supportPreference = SupportRoleDefault;
    }

    reset() {
        this.userId = "";
        this.playerName = "";
        this.names = new Array<string>();
        this.tankSr = -1;
        this.tankPreference = TankRoleDefault;
        this.dpsSr = -1;
        this.dpsPreference = DpsRoleDefault;
        this.supportSr = -1;
        this.supportPreference = SupportRoleDefault;
    }
}