import {errorSnackBar} from "../../utilities/AxiosSnackBar/AxiosSnackBar";
import axios from "axios";

function deletePlayer(uuid: string, props: any, callback: any) {
    axios.delete("/api/v1/players/" + uuid, {
        responseType: "json",
    }).then(function (response) {
        if (response.status === 200) {
            callback();
            props.enqueueSnackbar("Player deleted successfully", {
                anchorOrigin: {horizontal: "right", vertical: "top"},
                variant: "success",
                transitionDuration: {enter: 225, exit: 195},
                autoHideDuration: 1500
            });
        }
    }).catch(function (reason) {
        errorSnackBar(reason, props, [
            {error: 400, message: "Malformed request"}
        ]);
    });
}

export default deletePlayer;