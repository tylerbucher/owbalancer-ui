import React, {useEffect} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {GetPermissionModelApi} from "../../../shared/rest/models/GetPermissionModel";
import Button from "@material-ui/core/Button";
import getPermissions from "../../../shared/rest/GetPermissions";
import {getPermissionValues, getPermissionValuesFromNumArray} from "../../../shared/Helper";
import getInvites from "../../../shared/rest/GetInvites";
import {GetInviteModelApi} from "../../../shared/rest/models/GetInviteModel";
import {withSnackbar} from "notistack";
import patchInvite from "../../../shared/rest/PatchInvite";
import {PatchNewInviteModel} from "../../../shared/rest/models/PatchNewInviteModel";
import deleteInvite from "../../../shared/rest/DeleteInvite";
import {internalCanDeleteInvites, internalCanModifyInvites, isAdmin} from "../../../utilities/Permissions";

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

function UserInvites(props: any) {
    const classes = useStyles();
    const [permissions, setPermissions] = React.useState(new Array<GetPermissionModelApi>());
    const [newPermissions, setNewPermissions] = React.useState(new Array<GetPermissionModelApi>());
    const [invites, setInvites] = React.useState(new Array<GetInviteModelApi>());
    const [invite, setInvite] = React.useState<GetInviteModelApi | null>(null);
    const [email, setEmail] = React.useState("");
    const [canModify] = React.useState(!internalCanModifyInvites(props.userModel.permissions));
    const [canDelete] = React.useState(!internalCanDeleteInvites(props.userModel.permissions));

    useEffect(() => {
        getPermissions(props, setPermissions);
        getInvites(props, setInvites);
    }, [props, setPermissions, setInvites]);

    const onDelete = () => {
        deleteInvite(email, props, clear);
    };
    const clear = () => {
        setNewPermissions([]);
        setEmail("");
        setInvite(null);
        getInvites(props, setInvites);
    };
    const onSubmitSuccess = () => {
        if (invite !== null && invite !== undefined) {
            if (invite.email !== email) {
                setInvite(null);
                setEmail("");
                setNewPermissions([]);
            }
        }
        getInvites(props, setInvites);
    };
    const onSubmit = () => {
        if (invite !== null && invite !== undefined) {
            patchInvite(new PatchNewInviteModel(invite.email, email, getPermissionValues(newPermissions)), props, onSubmitSuccess);
        }
    };

    return (
        <div className={classes.form}>
            <Typography variant="h4">
                User Invites
            </Typography>
            <Autocomplete
                id="combo-box-demo"
                options={invites}
                getOptionLabel={(option: GetInviteModelApi) => option.email}
                value={invite}
                getOptionSelected={((option: GetInviteModelApi, value: GetInviteModelApi) => {
                    return option.email === value.email;
                })}
                renderInput={(params) => <TextField {...params} label="Invites"
                                                    variant="outlined"
                                                    helperText={"The selected invite to modify."}/>
                }
                onChange={(event, value) => {
                    setInvite(value);
                    if (value !== null) {
                        setEmail(value.email);
                        setNewPermissions(getPermissionValuesFromNumArray(permissions, value.permissions));
                    }
                }}
                filterSelectedOptions={true}
                fullWidth
            />
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
                disabled={canModify}
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
                    <Button variant="contained" color="secondary" fullWidth onClick={onDelete} disabled={canDelete}>
                        Delete
                    </Button>
                </Grid>
                <Grid item xs={8} className={classes.form}>
                    <Button variant="contained" color="primary" fullWidth onClick={onSubmit} disabled={canModify}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default withSnackbar(UserInvites);