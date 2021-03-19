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
import {GetInviteModelApi} from "../../../shared/rest/models/GetInviteModel";
import {withSnackbar} from "notistack";
import patchInvite from "../../../shared/rest/PatchInvite";
import {PatchNewInviteModel} from "../../../shared/rest/models/PatchNewInviteModel";
import deleteInvite from "../../../shared/rest/DeleteInvite";
import CheckIcon from '@material-ui/icons/Check';
import ToggleButton from '@material-ui/lab/ToggleButton';
import getUsers from "../../../shared/rest/GetUsers";
import {GetUserModelApi} from "../../../shared/rest/models/GetUserModel";
import patchUser from "../../../shared/rest/PatchUser";
import {PatchUserModel} from "../../../shared/rest/models/PatchUserModel";
import deleteUser from "../../../shared/rest/DeleteUser";
import {
    internalCanDeleteInvites, internalCanDeleteUsers,
    internalCanModifyInvites,
    internalCanModifyUsers, IS_USER_SUPER_ADMIN, isAdmin
} from "../../../utilities/Permissions";

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
        },
        fullWidth: {
            width: "100%"
        }
    }),
);

function ManageUsers(props: any) {
    const classes = useStyles();
    const [permissions, setPermissions] = React.useState(new Array<GetPermissionModelApi>());

    const [users, setUsers] = React.useState(new Array<GetUserModelApi>());
    const [user, setUser] = React.useState<GetUserModelApi | null>(null);

    const [selected, setSelected] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [newPermissions, setNewPermissions] = React.useState(new Array<GetPermissionModelApi>());

    const [canModify, setCanModify] = React.useState(!internalCanModifyUsers(props.userModel.permissions));
    const [canDelete, setCanDelete] = React.useState(!internalCanDeleteUsers(props.userModel.permissions));

    useEffect(() => {
        getPermissions(props, setPermissions);
        getUsers(props, setUsers);
    }, [props, setPermissions, setUsers]);

    const onDelete = () => {
        deleteUser(email, props, clear);
    };
    const clear = () => {
        setUser(null);
        setEmail("");
        setSelected(false);
        setUsername("");
        setNewPermissions([]);
        getUsers(props, setUsers);
    };
    const onSubmitSuccess = () => {
        if (user !== null && user !== undefined) {
            if (user.email !== email) {
                setUser(null);
                setEmail("");
                setSelected(false);
                setUsername("");
                setNewPermissions([]);
            }
        }
        getUsers(props, setUsers);
    };
    const onSubmit = () => {
        if (user !== null && user !== undefined) {
            patchUser(new PatchUserModel(user.email, username, selected, password, getPermissionValues(newPermissions)), props, onSubmitSuccess);
        }
    };

    return (
        <div className={classes.form}>
            <Typography variant="h4">
                User Accounts
            </Typography>
            <Autocomplete
                id="combo-box-demo"
                options={users}
                getOptionLabel={(option: GetInviteModelApi) => option.email}
                value={user}
                getOptionSelected={((option: GetUserModelApi, value: GetUserModelApi) => {
                    return option.email === value.email;
                })}
                renderInput={(params) => <TextField {...params} label="Users"
                                                    variant="outlined"
                                                    helperText={"The selected user to modify."}/>
                }
                onChange={(event, value) => {
                    setUser(value);
                    if (value !== null) {
                        setSelected(value.active);
                        setEmail(value.email);
                        setUsername(value.username);
                        setNewPermissions(getPermissionValuesFromNumArray(permissions, value.permissions));

                        if(value.permissions.includes(IS_USER_SUPER_ADMIN) && !props.userModel.permissions.includes(IS_USER_SUPER_ADMIN)) {
                            setCanModify(false);
                            setCanDelete(false);
                        }
                    }
                }}
                filterSelectedOptions={true}
                fullWidth
            />
            <Typography variant="h6">
                Active
            </Typography>
            <ToggleButton
                value="check"
                selected={selected}
                onChange={() => {
                    setSelected(!selected);
                }}
                className={classes.fullWidth}
                disabled={canModify || getPermissionValues(newPermissions).includes(IS_USER_SUPER_ADMIN)}
            >
                <CheckIcon/>
            </ToggleButton>
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
                Username
            </Typography>
            <TextField
                fullWidth
                id="username"
                label="Username"
                type="text"
                variant="outlined"
                value={username}
                onChange={(event => {
                    setUsername(event.target.value)
                })}
                disabled={canModify}
            />
            <Typography variant="h6">
                Reset Users Password
            </Typography>
            <TextField
                fullWidth
                id="password"
                label="Password"
                type="text"
                variant="outlined"
                value={password}
                onChange={(event => {
                    setPassword(event.target.value)
                })}
                helperText={"Upon form submit, the users password will be set to any value in this field."}
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
                                                    helperText={"The selected permissions a user will be able to use throughout the application."}/>
                }
                onChange={(event, value) => {
                    setNewPermissions(value);
                }}
                filterSelectedOptions={true}
                fullWidth
                disabled={canModify}
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

export default withSnackbar(ManageUsers);