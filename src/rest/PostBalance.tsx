import TagPlayer from "../models/TagPlayer";
import {errorSnackBar} from "../utilities/AxiosSnackBar/AxiosSnackBar";
import axios from "axios";
import BalanceResponse from "../models/BalanceResponse";

function balance(users: Array<TagPlayer>, props: any, callback: any) {
    let userIds = new Set<number>();
    users.forEach((user) => {
        userIds.add(user.id);
    });

    axios.post("/api/v1/balance", {
        userIds: Array.from(userIds),
    }, {
        responseType: "json",
    }).then(function (response) {
        if (response.status === 200) {
            let balanceResponse = new BalanceResponse(JSON.stringify(response.data.api));
            callback(balanceResponse);
        }
    }).catch(function (reason) {
        errorSnackBar(reason, props, [{error: 400, message: "Malformed request"}, {error: 406, message: "Too many or not enough players"}]);
    });
}

export default balance;