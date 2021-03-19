import axios from "axios";
import {errorSnackBar} from "../../utilities/AxiosSnackBar/AxiosSnackBar";
import GetUserModel from "./models/GetUserModel";

function getUser(props: any, callback: any) {
    axios.get("/api/v1/users", {
        responseType: "json",
    }).then(function (response) {
        if (response.status === 200) {
            let model: GetUserModel | null = null;
            model = (JSON.parse(JSON.stringify(response.data["user"])));
            if(model != null) {
                model.maxPlayersPerUser = response.data["maxPlayersPerUser"]
            }
            callback(model);
        }
    }).catch(function (reason) {
        errorSnackBar(reason, props);
        callback(false);
    });
}

export default getUser;