import axios from "axios";
import {errorSnackBar} from "../../utilities/AxiosSnackBar/AxiosSnackBar";
import {BasicUserModel} from "./models/BasicUserModel";


function getBasicUserList(notify: boolean, callback: any, props: any) {
    let userList = new Array<BasicUserModel>();
    axios.get("/api/v1/players", {
        responseType: "json",
    }).then(function (response) {
        if (response.status === 200) {
            response.data["players"].forEach(function (value: Object) {
                // @ts-ignore
                userList.push(new BasicUserModel(value["uuid"], value["playerName"], value["names"]))
            });
            if (notify) {
                props.enqueueSnackbar("Users Updated", {
                    anchorOrigin: {horizontal: "right", vertical: "top"},
                    variant: "success",
                    transitionDuration: {enter: 225, exit: 195},
                    autoHideDuration: 1500
                });
            }
            callback(userList);
        }
    }).catch(function (reason) {
        errorSnackBar(reason, props);
    });
}

export default getBasicUserList;