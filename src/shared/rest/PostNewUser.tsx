import {errorSnackBar} from "../../utilities/AxiosSnackBar/AxiosSnackBar";
import axios from "axios";
import {PostNewUserModelApi} from "./models/PostNewUserModel";

function postNewUser(postRequest: PostNewUserModelApi, props: any, callback: any) {
    axios.post("/api/v1/users", postRequest, {
        responseType: "json",
    }).then(function (response) {
        if (response.status === 200) {
            callback();
            props.enqueueSnackbar("User created successfully", {
                anchorOrigin: {horizontal: "right", vertical: "top"},
                variant: "success",
                transitionDuration: {enter: 225, exit: 195},
                autoHideDuration: 1500
            });
        }
    }).catch(function (reason) {
        errorSnackBar(reason, props, [
            {error: 400, message: "Malformed request"},
            {error: 406, message: "Some submitted data is invalid"},
            {error: 409, message: "This user already exists or account creation is disabled at this time."},
        ]);
    });
}

export default postNewUser;