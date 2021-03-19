import {errorSnackBar} from "../../utilities/AxiosSnackBar/AxiosSnackBar";
import axios from "axios";
import {CompleteUserModel, CompleteUserModelApi} from "./models/CompleteUserModel";

function getTotalUserInfoById(id: string, props: any, callback: any) {
    axios.get("/api/v1/players/" + id, {
        responseType: "json",
    }).then(function (response) {
        if (response.status === 200) {
            let statPlayer: CompleteUserModelApi = new CompleteUserModel(JSON.stringify(response.data.player));
            callback(statPlayer);
        }
    }).catch(function (reason) {
        errorSnackBar(reason, props, [
            {error: 400, message: "Malformed request"},
            {error: 406, message: "Some submitted data is invalid"},
            {error: 409, message: "This user already exists"},
        ]);
    });
}

export default getTotalUserInfoById;