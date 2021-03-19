import TablePlayer from "./TablePlayer";
import MetadataResponse from "./MetadataResponse";

interface UserByIdResponseApi {
    uuid: string;
    name: string;
    tankPreference: number;
    dpsPreference: number;
    supportPreference: number;
    tankSr: number;
    dpsSr: number;
    supportSr: number;
    totalPref: number;
    owNames: Array<string>;
}

class UserByIdResponse {

    public readonly uuid: string;
    public readonly name: string;
    public readonly tankPreference: number;
    public readonly dpsPreference: number;
    public readonly supportPreference: number;
    public readonly tankSr: number;
    public readonly dpsSr: number;
    public readonly supportSr: number;
    public readonly totalPref: number;
    public readonly owNames: Array<string>;


    constructor(inputString: string) {
        let jsonObj: UserByIdResponseApi = JSON.parse(inputString);

        this.uuid = jsonObj.uuid;
        this.name = jsonObj.name;
        this.tankPreference = jsonObj.tankPreference;
        this.dpsPreference = jsonObj.dpsPreference;
        this.supportPreference = jsonObj.supportPreference;
        this.tankSr = jsonObj.tankSr;
        this.dpsSr = jsonObj.dpsSr;
        this.supportSr = jsonObj.supportSr;
        this.totalPref = jsonObj.tankPreference;
        this.owNames = jsonObj.owNames;
    }
}

export default UserByIdResponse;