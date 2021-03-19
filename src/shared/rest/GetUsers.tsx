import axios from "axios";
import {errorSnackBar} from "../../utilities/AxiosSnackBar/AxiosSnackBar";
import {GetUserModelApi} from "./models/GetUserModel";


function getUsers(props: any, callback: any) {
    axios.get("/api/v1/users/allUsers", {
        responseType: "json",
    }).then(function (response) {
        if (response.status === 200) {
            let aar = new Array<GetUserModelApi>();
            response.data["users"].forEach((item: any) => {
                aar.push((JSON.parse(JSON.stringify(item))))
            });
            callback(aar);
        }
    }).catch(function (reason) {
        errorSnackBar(reason, props);
        callback(false);
    });
}

export default getUsers;