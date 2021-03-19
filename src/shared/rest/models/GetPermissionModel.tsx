export interface GetPermissionModelApi {
    name: string;
    description: string;
    value: number;
}


export class GetPermissionModel implements GetPermissionModelApi {

    public name: string;
    public description: string;
    public value: number;

    constructor(name: string, description: string, value: number) {
        this.name = name;
        this.description = description;
        this.value = value;
    }
}
