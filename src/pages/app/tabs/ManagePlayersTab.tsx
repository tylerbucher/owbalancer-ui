import React, {useEffect} from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import RolesFormField from "../../../shared/forms/RolesFormField";
import PlayerNameFormField from "../../../shared/forms/PlayerNameFormField";
import OverwatchNamesFormField from "../../../shared/forms/OverwatchNamesFormField";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withSnackbar} from "notistack";
import {invertedUserList} from "./BalancerTab";
import {BasicTagPlayerModel, BasicTagPlayerModelApi} from "../../../shared/models/BasicTagPlayerModel";
import getTotalUserInfoById from "../../../shared/rest/GetTotalUserInfoById";
import {CompleteUserModel, CompleteUserModelApi} from "../../../shared/rest/models/CompleteUserModel";
import patchPlayer from "../../../shared/rest/PatchPlayer";
import UserSelectFormField from "../../../shared/forms/UserSelectFormField";
import getUsers from "../../../shared/rest/GetUsers";
import {GetUserModelApi} from "../../../shared/rest/models/GetUserModel";
import {PatchPlayerModelApi, PatchPlayerModel} from "../../../shared/rest/models/PatchPlayerModel";
import {AutocompleteRenderGroupParams} from "@material-ui/lab/Autocomplete/Autocomplete";
import {ListSubheader} from "@material-ui/core";
import deletePlayer from "../../../shared/rest/DeletePlayer";
import {internalCanDeletePlayers, internalCanDeleteUsers} from "../../../utilities/Permissions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflowY: "auto"
        },
        form: {
            '& > *': {
                margin: theme.spacing(1),
            },
            maxHeight: "100%"
        },
        groupLabel: {
            top: "-8px",
            backgroundColor: theme.palette.type === 'dark' ? theme.palette.background.paper : theme.palette.text.primary
        },
        groupUl: {
            padding: 0
        }
    }),
);

class CallBacks {
    public discordNameCallBack: any;
    public owNamesCallBack: any;
    public rolesCallBack: any;
    public userSelectCallBack: any;
}

function ManagePlayersTab(props: any) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [autoValue, setAutoValue] = React.useState<BasicTagPlayerModelApi | null>(null);
    const [disabled, setDisabled] = React.useState(true);
    const [userModel, setUserModel] = React.useState<PatchPlayerModelApi>(new PatchPlayerModel());
    const [callbacks] = React.useState(new CallBacks());
    const [canDelete, setCanDelete] = React.useState(!internalCanDeletePlayers(props.userModel.permissions));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = () => {
        setOpen(false);
        deletePlayer(userModel.uuid, props, reset);
    };
    const reset = () => {
        setAutoValue(null);
        if (callbacks.discordNameCallBack !== undefined) {
            callbacks.discordNameCallBack();
        }
        if (callbacks.owNamesCallBack !== undefined) {
            callbacks.owNamesCallBack();
        }
        if (callbacks.rolesCallBack !== undefined) {
            callbacks.rolesCallBack();
        }
        if (callbacks.userSelectCallBack !== undefined) {
            callbacks.userSelectCallBack();
        }
        props.onUserListUpdate();
        setUserModel(new PatchPlayerModel());
        setDisabled(true);
    };

    const handleSubmit = () => {
        if (userModel !== null && userModel !== undefined) {
            patchPlayer(userModel, props, refresh);
        }
    };
    const refresh = () => {
        props.onUserListUpdate();
    };

    const setNewUserModel = (model: CompleteUserModel) => {
        setUserModel(PatchPlayerModel.fromCompleteUserModel(model));
        setDisabled(false);
    };

    return (
        <Container maxWidth="md" className={classes.root}>
            <form noValidate autoComplete="off" className={classes.form}>
                <Grid container spacing={1} justify="center">
                    <Grid item xs={9} className={classes.form}>
                        <Typography variant="h4">
                            Manage Players
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={1} justify="center">
                    <Grid item xs={9} className={classes.form}>
                        <Autocomplete
                            id="combo-box-demo"
                            options={invertedUserList(props.basicUserList)}
                            value={autoValue}
                            getOptionLabel={(option: BasicTagPlayerModelApi) => option.names}
                            groupBy={(option: BasicTagPlayerModelApi) => option.uuid}
                            renderInput={(params) => <TextField {...params} label="Select a player to edit"
                                                                variant="outlined" autoFocus/>}
                            onChange={(event, value: BasicTagPlayerModelApi | null) => {
                                setAutoValue(value);
                                if (value !== null) {
                                    getTotalUserInfoById(value.uuid, props, setNewUserModel);
                                }
                            }}
                            getOptionSelected={((option, value) => {
                                return BasicTagPlayerModel.equals(option, value)
                            })}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <PlayerNameFormField className={classes.form} userModel={userModel} submitCallBack={callbacks}
                                     basicUserList={props.basicUserList} disabled={disabled}/>
                <OverwatchNamesFormField className={classes.form} userModel={userModel} submitCallBack={callbacks}
                                         basicUserList={props.basicUserList} disabled={disabled}/>
                <RolesFormField className={classes.form} userModel={userModel} submitCallBack={callbacks}
                                basicUserList={props.basicUserList} disabled={disabled}/>
                <Grid container spacing={1} justify="center">
                    <Grid item xs={3} className={classes.form}>
                        <Button variant="contained" color="secondary" fullWidth onClick={handleClickOpen} disabled={canDelete || disabled}>
                            Delete
                        </Button>
                    </Grid>
                    <Grid item xs={6} className={classes.form}>
                        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth disabled={disabled}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Confirm deleting player?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete "{userModel?.playerName}"?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary" autoFocus>
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        </Container>
    );
}

export default withSnackbar(ManagePlayersTab);