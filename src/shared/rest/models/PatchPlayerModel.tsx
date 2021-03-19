import {DpsRoleDefault, SupportRoleDefault, TankRoleDefault} from "../../forms/FormData";
import {CompleteUserModel} from "./CompleteUserModel";

export interface PatchPlayerModelApi {
    uuid: string;
    playerName: string;
    names: Array<string>;
    tankSr: number;
    tankPreference: number;
    dpsSr: number;
    dpsPreference: number;
    supportSr: number;
    supportPreference: number;
}

export class PatchPlayerModel implements PatchPlayerModelApi {
    uuid: string;
    playerName: string;
    names: Array<string>;
    tankSr: number;
    tankPreference: number;
    dpsSr: number;
    dpsPreference: number;
    supportSr: number;
    supportPreference: number;

    constructor() {
        this.uuid = "";
        this.playerName = "";
        this.names = new Array<string>();
        this.tankSr = -1;
        this.tankPreference = TankRoleDefault;
        this.dpsSr = -1;
        this.dpsPreference = DpsRoleDefault;
        this.supportSr = -1;
        this.supportPreference = SupportRoleDefault;
    }

    static fromCompleteUserModel(userModel: CompleteUserModel): PatchPlayerModel {
        let model = new PatchPlayerModel();
        model.uuid = userModel.uuid;
        model.playerName = userModel.playerName;
        model.names = userModel.names;
        model.tankSr = userModel.tankSr;
        model.tankPreference = userModel.tankPreference;
        model.dpsSr = userModel.dpsSr;
        model.dpsPreference = userModel.dpsPreference;
        model.supportSr = userModel.supportSr;
        model.supportPreference = userModel.supportPreference;

        return model;
    }
}