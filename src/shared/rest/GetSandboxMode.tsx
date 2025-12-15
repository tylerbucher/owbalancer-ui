import axios from "axios";
import {GetUserModelApi} from "./models/GetUserModel";
import {errorSnackBar} from "../../utilities/AxiosSnackBar/AxiosSnackBar";

function getSandboxMode(props: any, callback: any) {
    axios.get("/api/v1/sandboxMode", {
        responseType: "json",
    }).then(function (response) {
        if (response.status === 200) {
            callback(response.data);
        }
    });
}

export default getSandboxMode;
