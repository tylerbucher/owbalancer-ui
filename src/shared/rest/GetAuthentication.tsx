import axios from "axios";
import {errorSnackBar} from "../../utilities/AxiosSnackBar/AxiosSnackBar";


function getAuthentication(props: any, callback: any) {
    axios.get("/api/v1/authentication", {
        responseType: "json",
    }).then(function (response) {
        if (response.status === 200) {
            callback(true);
        }
    }).catch(function (reason) {
        errorSnackBar(reason, props);
        callback(false);
    });
}

export default getAuthentication;