import {GetInviteModelApi} from "../rest/models/GetInviteModel";
import {GetUserModelApi} from "../rest/models/GetUserModel";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";

function getUserModelFromEmail(email: string, users: Array<GetUserModelApi>): GetUserModelApi | null {
    for (const user of users) {
        if (user.email === email) {
            return user;
        }
    }
    return null;
}

function UserSelectFormField(props: any) {
    const [user, setUser] = React.useState<GetUserModelApi | null>(null);

    useEffect(() => {
        props.submitCallBack.userSelectCallBack = reset;
        //setUser(getUserModelFromEmail(props.userModel.userId, props.users));
    }, [props.submitCallBack.userSelectCallBack, props.userModel.userId, props.users]);

    const reset = () => {
        setUser(null);
    };

    return (
        <Grid container spacing={1} justify="center">
            <Grid item xs={9} className={props.className}>
                <Autocomplete
                    id="users"
                    options={props.users}
                    getOptionLabel={(option: GetUserModelApi) => option.username}
                    value={user}
                    getOptionSelected={((option: GetUserModelApi, value: GetUserModelApi) => {
                        return option.username === value.username;
                    })}
                    renderInput={(params) => <TextField {...params} label="Users"
                                                        variant="outlined"
                                                        autoFocus={props.autoFocus === undefined ? false : props.autoFocus}
                                                        helperText={"The user this player will be added to."}/>
                    }
                    onChange={(event, value) => {
                        setUser(value);
                        if (value !== null) {
                            props.userModel.userId = value.username;
                        }
                    }}
                    filterSelectedOptions={true}
                    fullWidth
                    disabled={props.disabled === undefined ? false : props.disabled}
                />
            </Grid>
        </Grid>

    );
}

export default UserSelectFormField;