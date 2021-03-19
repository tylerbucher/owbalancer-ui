import axios from "axios";
import {errorSnackBar} from "../../utilities/AxiosSnackBar/AxiosSnackBar";
import {PostAuthenticationModelApi} from "./models/PostAuthenticationModel";


function postAuthentication(model: PostAuthenticationModelApi, props: any, callback: any) {
    axios.post("/api/v1/authentication", model, {
        responseType: "json",
    }).then(function (response) {
        if (response.status === 200) {
            callback();
        }
    }).catch(function (reason) {
        errorSnackBar(reason, props, [
            {error: 400, message: "Malformed request"},
            {error: 406, message: "Invalid username or password / Account could be inactive"}
        ]);
    });
}

export default postAuthentication;