import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import RolesFormField from "../../../shared/forms/RolesFormField";
import DiscordNameFormField from "../../../shared/forms/DiscordNameFormField";
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
import {PostNewUserModel, PostNewUserModelApi} from "../../../shared/rest/models/PostNewUserModel";
import {CompleteUserModel, CompleteUserModelApi} from "../../../shared/rest/models/CompleteUserModel";
import postUserUpdate from "../../../shared/rest/PostUserUpdate";
import deleteUser from "../../../shared/rest/DeleteUser";

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
            },
        }
    }),
);

class CallBacks {
    public discordNameCallBack: any;
    public owNamesCallBack: any;
    public rolesCallBack: any;
}

function ManagePlayersTab(props: any) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [autoValue, setAutoValue] = React.useState<BasicTagPlayerModelApi | null>(null);
    const [disabled, setDisabled] = React.useState(true);
    const [userModel, setUserModel] = React.useState<CompleteUserModelApi>(new CompleteUserModel());
    const [callbacks] = React.useState(new CallBacks());

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = () => {
        setOpen(false);
        deleteUser(userModel.id, props, refresh);
        if(props.basicUserList.length > 0) {
            let obj = new BasicTagPlayerModel(props.basicUserList[0].id, props.basicUserList[0].discordName, props.basicUserList[0].discordName)
            setAutoValue(obj);
            console.log(obj)
            getTotalUserInfoById(props.basicUserList[0].id, props, setNewUserModel)
            console.log(autoValue)
        }
    };
    const handleSubmit = () => {
        postUserUpdate(userModel, props, refresh);
    };
    const refresh = () => {
        props.onUserListUpdate();
    };

    const setNewUserModel = (model: CompleteUserModelApi) => {
        setUserModel(model);
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
                            getOptionLabel={(option: BasicTagPlayerModelApi) => option.overwatchName}
                            groupBy={(option: BasicTagPlayerModelApi) => option.discordName}
                            renderInput={(params) => <TextField {...params} label="Select a user to edit"
                                                                variant="outlined" autoFocus/>}
                            onChange={(event, value: BasicTagPlayerModelApi | null)=>{
                                setAutoValue(value);
                                if(value !== null) {
                                    getTotalUserInfoById(value.id, props, setNewUserModel);
                                }
                            }}
                            getOptionSelected={((option, value) => {
                                return BasicTagPlayerModel.equals(option, value)
                            })}
                            /*openOnFocus*/
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <DiscordNameFormField className={classes.form} userModel={userModel} submitCallBack={callbacks} basicUserList={props.basicUserList} disabled={disabled}/>
                <OverwatchNamesFormField className={classes.form} userModel={userModel} submitCallBack={callbacks} basicUserList={props.basicUserList} disabled={disabled}/>
                <RolesFormField className={classes.form} userModel={userModel} submitCallBack={callbacks} basicUserList={props.basicUserList} disabled={disabled}/>
                <Grid container spacing={1} justify="center">
                    <Grid item xs={3} className={classes.form}>
                        <Button variant="contained" color="secondary" fullWidth onClick={handleClickOpen}>
                            Delete
                        </Button>
                    </Grid>
                    <Grid item xs={6} className={classes.form}>
                        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
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
                            Are you sure you want to delete "{userModel.username}"?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary" autoFocus>
                            Disagree
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