import {GetPermissionModelApi} from "./rest/models/GetPermissionModel";

export function getPermissionValues(values: Array<GetPermissionModelApi>): Array<number> {
    let newArray = new Array<number>();
    values.forEach((value => newArray.push(value.value)));
    return newArray;
}

export function getPermissionValuesFromNumArray(values: Array<GetPermissionModelApi>, nValues: Array<number>): Array<GetPermissionModelApi> {
    let newArray = new Array<GetPermissionModelApi>();
    nValues.forEach((value) => {
        const val = values.find(element => element.value === value);
        if(val !== undefined) {
            newArray.push(val);
        }
    });
    return newArray;
}