import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {DiscordNameHelperText} from "../../../shared/forms/FormData";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import {getCGBAuthToken} from "../../../utilities/CookieHelper";
import getAuthentication from "../../../shared/rest/GetAuthentication";
import getPermissions from "../../../shared/rest/GetPermissions";
import {GetPermissionModel, GetPermissionModelApi} from "../../../shared/rest/models/GetPermissionModel";
import {BasicTagPlayerModel, BasicTagPlayerModelApi} from "../../../shared/models/BasicTagPlayerModel";
import {invertedUserList} from "../tabs/BalancerTab";
import {withSnackbar} from "notistack";
import postNewInvite from "../../../shared/rest/PostNewInvite";
import {PostNewInviteModel} from "../../../shared/rest/models/PostNewInviteModel";
import {getPermissionValues} from "../../../shared/Helper";
import {GetUserModelApi} from "../../../shared/rest/models/GetUserModel";
import {isAdmin} from "../../../utilities/Permissions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        },
        form: {
            '& > *': {
                margin: theme.spacing(1),
                marginLeft: 0
            },
        }
    }),
);

function InviteUser(props: any) {
    const classes = useStyles();
    const [permissions, setPermissions] = React.useState(new Array<GetPermissionModelApi>());
    const [newPermissions, setNewPermissions] = React.useState(new Array<GetPermissionModelApi>());
    const [email, setEmail] = React.useState("");

    useEffect(() => {
        getPermissions(props, setPermissions)
    }, [props, setPermissions]);

    const clear = () => {
        setNewPermissions([]);
        setEmail("");
    };
    const onSubmit = () => {
        postNewInvite(new PostNewInviteModel(email, getPermissionValues(newPermissions)), props, clear);
    };


    return (
        <div className={classes.form}>
            <Typography variant="h4" gutterBottom>
                Invite New User
            </Typography>
            <Typography variant="h6">
                Email
            </Typography>
            <TextField
                fullWidth
                id="email"
                label="Email"
                type="text"
                variant="outlined"
                value={email}
                onChange={(event => {
                    setEmail(event.target.value)
                })}
                autoFocus
            />
            <Typography variant="h6">
                Permissions
            </Typography>
            <Autocomplete
                id="combo-box-demo"
                multiple
                options={permissions}
                getOptionLabel={(option: GetPermissionModelApi) => option.name}
                value={newPermissions}
                getOptionSelected={((option: GetPermissionModelApi, value: GetPermissionModelApi) => {
                    return option.value === value.value;
                })}
                renderInput={(params) => <TextField {...params} label="Permissions"
                                                    variant="outlined"
                                                    helperText={"The selected permissions will be applied to the user when the create their account."}/>
                }
                onChange={(event, value) => {
                    setNewPermissions(value);
                }}
                filterSelectedOptions={true}
                fullWidth
                disabled={!isAdmin(props.userModel.permissions)}
            />
            <Grid container spacing={1} justify="center">
                <Grid item xs={4} className={classes.form}>
                    <Button variant="contained" color="secondary" fullWidth onClick={clear}>
                        Clear
                    </Button>
                </Grid>
                <Grid item xs={8} className={classes.form}>
                    <Button variant="contained" color="primary" fullWidth onClick={onSubmit} >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default withSnackbar(InviteUser);