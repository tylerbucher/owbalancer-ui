import axios from "axios";
import {errorSnackBar} from "../../../utilities/AxiosSnackBar/AxiosSnackBar";

class User {

    public id: number;
    public name: string;
    public owNames: Array<string>;

    constructor(id: number, name: string, owNames: Array<string>) {
        this.id = id;
        this.name = name;
        this.owNames = owNames;
    }
}


function refreshPlayers(notify: boolean, props: any) {
    axios.get("/api/v1/users/-1", {
        responseType: "json",
    }).then(function (response) {
        if (response.status === 200) {
            let userList = new Array<User>();
            response.data["api"]["users"].forEach(function (value: Object) {
                // @ts-ignore
                userList.push(new User(value["id"], value["discordName"], value["owNames"]))
            });
            if (notify) {
                props.enqueueSnackbar("Users Updated", {
                    anchorOrigin: {horizontal: "right", vertical: "top"},
                    variant: "success",
                    transitionDuration: {enter: 225, exit: 195},
                    autoHideDuration: 1500
                });
            }
        }
    }).catch(function (reason){
        errorSnackBar(reason, props);
    });
}

export default refreshPlayers;