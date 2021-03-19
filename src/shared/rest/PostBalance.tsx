import {errorSnackBar} from "../../utilities/AxiosSnackBar/AxiosSnackBar";
import axios from "axios";
import {BalanceResponseModel} from "./models/BalanceResponseModel";
import {BasicTagPlayerModelApi} from "../models/BasicTagPlayerModel";

function balance(users: Array<BasicTagPlayerModelApi>, props: any, callback: any) {
    let userIds = new Set<string>();
    users.forEach((user) => {
        userIds.add(user.uuid);
    });

    axios.post("/api/v1/balance", {
        userIds: Array.from(userIds),
    }, {
        responseType: "json",
    }).then(function (response) {
        if (response.status === 200) {
            let balanceResponse = new BalanceResponseModel(JSON.stringify(response.data));
            callback(balanceResponse);
        }
    }).catch(function (reason) {
        errorSnackBar(reason, props, [{error: 400, message: "Malformed request"}, {
            error: 406,
            message: "Too many or not enough players"
        }]);
    });
}

export default balance;