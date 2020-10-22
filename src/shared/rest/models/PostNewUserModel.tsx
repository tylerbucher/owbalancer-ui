import {DpsRoleDefault, SupportRoleDefault, TankRoleDefault} from "../../forms/FormData";

export interface PostNewUserModelApi {
    username: string;
    overwatchNames: Array<string>;
    tankSr: number;
    tankPreference: number;
    dpsSr: number;
    dpsPreference: number;
    supportSr: number;
    supportPreference: number;
}

export class PostNewUserModel implements PostNewUserModelApi {
    username: string;
    overwatchNames: Array<string>;
    tankSr: number;
    tankPreference: number;
    dpsSr: number;
    dpsPreference: number;
    supportSr: number;
    supportPreference: number;

    constructor() {
        this.username = "";
        this.overwatchNames = new Array<string>();
        this.tankSr = -1;
        this.tankPreference = TankRoleDefault;
        this.dpsSr = -1;
        this.dpsPreference = DpsRoleDefault;
        this.supportSr = -1;
        this.supportPreference = SupportRoleDefault;
    }
}