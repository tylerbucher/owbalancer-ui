import axios from "axios";
import {errorSnackBar} from "../../utilities/AxiosSnackBar/AxiosSnackBar";
import {GetInviteModelApi} from "./models/GetInviteModel";


function getInvites(props: any, callback: any) {
    axios.get("/api/v1/invites", {
        responseType: "json",
    }).then(function (response) {
        if (response.status === 200) {
            let aar = new Array<GetInviteModelApi>();
            response.data["invites"].forEach((item: any) => {
                aar.push((JSON.parse(JSON.stringify(item))))
            });
            callback(aar);
        }
    }).catch(function (reason) {
        errorSnackBar(reason, props);
        callback(false);
    });
}

export default getInvites;