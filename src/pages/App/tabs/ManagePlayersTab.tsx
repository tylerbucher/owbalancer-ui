import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import RolesFormField from "./shared/RolesFormField";
import DiscordNameFormField from "./shared/DiscordNameFormField";
import OverwatchNamesFormField from "./shared/OverwatchNamesFormField";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {PostNewUserRequest} from "../../../rest/PostNewUser";
import {withSnackbar} from "notistack";

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

function ManagePlayersTab(props: any) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [addPlayerRequest, setAddPlayerRequest] = React.useState<PostNewUserRequest>(new PostNewUserRequest());

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                            options={new Array()}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => <TextField {...params} label="Select a user to edit"
                                                                variant="outlined" autoFocus/>}
                        />
                    </Grid>
                </Grid>
                <DiscordNameFormField className={classes.form} setAddPlayerRequest={addPlayerRequest}/>
                <OverwatchNamesFormField className={classes.form} setAddPlayerRequest={addPlayerRequest} submitCallBack={()=>{}}/>
                <RolesFormField className={classes.form} setAddPlayerRequest={addPlayerRequest}/>
                <Grid container spacing={1} justify="center">
                    <Grid item xs={3} className={classes.form}>
                        <Button variant="contained" color="secondary" fullWidth onClick={handleClickOpen}>
                            Delete
                        </Button>
                    </Grid>
                    <Grid item xs={6} className={classes.form}>
                        <Button variant="contained" color="primary" fullWidth>
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
                            Are you sure you want to delete "TheLegend27"?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary" autoFocus>
                            Disagree
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        </Container>
    );
}

export default withSnackbar(ManagePlayersTab);