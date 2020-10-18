import axios from "axios";
import {errorSnackBar} from "../../../utilities/AxiosSnackBar/AxiosSnackBar";
import BasicPlayer from "../../../models/BasicPlayer";


function refreshPlayers(notify: boolean, callback: any, props: any) {
    let userList = new Array<BasicPlayer>();
    axios.get("/api/v1/users/-1", {
        responseType: "json",
    }).then(function (response) {
        if (response.status === 200) {
            response.data["api"]["users"].forEach(function (value: Object) {
                // @ts-ignore
                userList.push(new BasicPlayer(value["id"], value["discordName"], value["owNames"]))
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
    }).catch(function (reason){
        errorSnackBar(reason, props);
    });
}

export default refreshPlayers;