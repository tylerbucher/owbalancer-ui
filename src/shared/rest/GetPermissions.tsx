import axios from "axios";
import {errorSnackBar} from "../../utilities/AxiosSnackBar/AxiosSnackBar";
import {GetPermissionModel} from "./models/GetPermissionModel";


function getPermissions(props: any, callback: any) {
    axios.get("/api/v1/permissions", {
        responseType: "json",
    }).then(function (response) {
        if (response.status === 200) {
            let aar = new Array<GetPermissionModel>();
            response.data["permissions"].forEach((item: any) => {aar.push((JSON.parse(JSON.stringify(item))))});
            callback(aar);
        }
    }).catch(function (reason) {
        errorSnackBar(reason, props);
        callback(false);
    });
}

export default getPermissions;