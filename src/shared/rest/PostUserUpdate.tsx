import {errorSnackBar} from "../../utilities/AxiosSnackBar/AxiosSnackBar";
import axios from "axios";
import {CompleteUserModelApi} from "./models/CompleteUserModel";

function postUserUpdate(postRequest: CompleteUserModelApi, props: any, callback: any) {
    axios.post("/api/v1/users/" + postRequest.id, {
        username: postRequest.username,
        overwatchNames: postRequest.owNames,
        tankSr: postRequest.tankSr,
        tankPreference: postRequest.tankPreference,
        dpsSr: postRequest.dpsSr,
        dpsPreference: postRequest.dpsPreference,
        supportSr: postRequest.supportSr,
        supportPreference: postRequest.supportPreference,
    }, {
        responseType: "json",
    }).then(function (response) {
        if (response.status === 200) {
            callback();
            props.enqueueSnackbar("User updated successfully", {
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
            {error: 409, message: "This user already exists"},
        ]);
    });
}

export default postUserUpdate;