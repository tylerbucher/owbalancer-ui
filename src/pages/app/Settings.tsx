import React from "react";
import clsx from 'clsx';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grid from "@material-ui/core/Grid";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import {DialogTitle} from "../../components/DialogTitle/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import {removeAuthCookies} from "../../utilities/CookieHelper";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import UserInvites from "./settingSubPages/UserInvites";
import AddIcon from '@material-ui/icons/Add';
import PeopleIcon from '@material-ui/icons/People';
import InviteUser from "./settingSubPages/InviteUser";
import Divider from '@material-ui/core/Divider';
import ManageUsers from "./settingSubPages/ManageUsers";
import {canInviteUsers, canModifyInvites, canModifyUsers} from "../../utilities/Permissions";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            //justifyContent: "center"
        },
        paper: {
            marginRight: theme.spacing(2),
        },
        selectedMenuItem: {
            backgroundColor: "rgba(255, 255, 255, 0.08)"
        }
    }),
);

function getDefaultItem(props: any) {
    if(canInviteUsers(props.userModel.permissions)) {
        return 1;
    } else if(canModifyInvites(props.userModel.permissions)) {
        return 2;
    } else if(canModifyUsers(props.userModel.permissions)) {
        return 3;
    } else {
        return 0;
    }
}

function Settings(props: any) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [item, setItem] = React.useState(getDefaultItem(props));
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleLogout = () => {
        removeAuthCookies();
        window.location.reload();
    };

    const ls = [
        (<div/>),
        (<InviteUser userModel={props.userModel}/>),
        (<UserInvites userModel={props.userModel}/>),
        (<ManageUsers userModel={props.userModel}/>)
    ];

    return (
        <Container maxWidth="md" className={classes.root}>
            <Grid container spacing={1} justify="center">
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <MenuList>
                            <MenuItem disabled={!canInviteUsers(props.userModel.permissions)} onClick={() => {
                                setItem(1)
                            }} className={clsx({[classes.selectedMenuItem]: item === 1})}>
                                <ListItemIcon>
                                    <AddIcon fontSize="small"/>
                                </ListItemIcon>
                                <Typography variant="inherit">Invite User</Typography>
                            </MenuItem>
                            <MenuItem disabled={!canModifyInvites(props.userModel.permissions)} onClick={() => {
                                setItem(2)
                            }} className={clsx({[classes.selectedMenuItem]: item === 2})}>
                                <ListItemIcon>
                                    <PersonAddIcon fontSize="small"/>
                                </ListItemIcon>
                                <Typography variant="inherit">User Invites</Typography>
                            </MenuItem>
                            <MenuItem disabled={!canModifyUsers(props.userModel.permissions)} onClick={() => {
                                setItem(3)
                            }} className={clsx({[classes.selectedMenuItem]: item === 3})}>
                                <ListItemIcon>
                                    <PeopleIcon fontSize="small"/>
                                </ListItemIcon>
                                <Typography variant="inherit">Manage Users</Typography>
                            </MenuItem>
                            <Divider variant="middle"/>
                            <MenuItem onClick={handleClickOpen}>
                                <ListItemIcon>
                                    <ExitToAppIcon fontSize="small"/>
                                </ListItemIcon>
                                <Typography variant="inherit">Logout</Typography>
                            </MenuItem>
                        </MenuList>
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    {ls[item]}
                </Grid>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" onClose={handleClose}>{"Logout?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you would like to logout?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary" autoFocus>
                            Cancel
                        </Button>
                        <Button onClick={handleLogout} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Container>
    );
}

export default Settings;