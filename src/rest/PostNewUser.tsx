import TagPlayer from "../models/TagPlayer";
import {errorSnackBar} from "../utilities/AxiosSnackBar/AxiosSnackBar";
import axios from "axios";
import BalanceResponse from "../models/BalanceResponse";
import {DpsRoleDefault, SupportRoleDefault, TankRoleDefault} from "../pages/App/tabs/shared/FormData";

export class PostNewUserRequest {
    username: string;
    overwatchNames: Array<string>;
    tankSr: number;
    tankPreference: number;
    dpsSr: number;
    dpsPreference: number;
    supportSr: number;
    supportPreference: number;


    constructor() {
        this.username = "";
        this.overwatchNames = new Array<string>();
        this.tankSr = -1;
        this.tankPreference = TankRoleDefault;
        this.dpsSr = -1;
        this.dpsPreference = DpsRoleDefault;
        this.supportSr = -1;
        this.supportPreference = SupportRoleDefault;
    }
}

function postNewUser(postRequest: PostNewUserRequest, props: any) {
    axios.post("/api/v1/users/-1", postRequest, {
        responseType: "json",
    }).then(function (response) {
        if (response.status === 200) {
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
            {error: 409, message: "This user already exists"},
        ]);
    });
}

export default postNewUser;