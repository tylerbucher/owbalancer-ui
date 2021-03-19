import React, {ChangeEvent} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {withSnackbar} from "notistack";
import {createStyles, makeStyles, Theme, WithStyles, withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import postAuthentication from "../../shared/rest/PostAuthentication";
import {PostAuthenticationModel} from "../../shared/rest/models/PostAuthenticationModel";
import {FormControlLabel} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {useHistory} from "react-router-dom";
import {DialogTitle} from "../../components/DialogTitle/DialogTitle";

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
        formGroup: {
            width: "100%",
            flexDirection: "row"
        },
        floatRight: {
            marginLeft: "auto",
            order: 2
        }
    }),
);

function Login(props: any) {
    const classes = useStyles();
    const history = useHistory();
    const [model] = React.useState(new PostAuthenticationModel("", "", false));
    const [rm, setRm] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        postAuthentication(model, props, onLogin)
    };
    const onLogin = () => {
        props.onAuth(true);
        history.push("/");
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        model.email = event.target.value;
    };
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        model.password = event.target.value;
    };
    const handleRememberMeChange = () => {
        model.rememberMe = !model.rememberMe;
        setRm(model.rememberMe);
    };

    const goToAccountCreation = () => {
        history.push("/createAccount");
    }

    return (
        <Container maxWidth="sm" className={classes.root}>
            <form noValidate autoComplete="off" className={classes.form}>
                <Grid container spacing={1} justify="center">
                    <Grid item xs={8} className={classes.form}>
                        <Typography variant="h4">
                            Login
                        </Typography>
                        <Typography variant="body2">
                            Sign in to use the custom game balancer
                        </Typography>
                        <TextField
                            autoFocus
                            fullWidth
                            id="name"
                            label="Email"
                            type="text"
                            variant={"outlined"}
                            onChange={handleEmailChange}
                        />
                        <TextField
                            fullWidth
                            id="name"
                            label="Password"
                            type="password"
                            variant={"outlined"}
                            onChange={handlePasswordChange}
                        />
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={rm}
                                        onChange={handleRememberMeChange}
                                        name="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember Me?"
                            />
                        </FormGroup>
                        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                            SIGN IN
                        </Button>
                        <FormGroup className={classes.formGroup}>
                            <Button size="small" onClick={handleClickOpen}>
                                Forgot Password
                            </Button>
                            <Button size="small" className={classes.floatRight} onClick={goToAccountCreation}>
                                Create Account
                            </Button>
                        </FormGroup>
                    </Grid>
                </Grid>
            </form>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" onClose={handleClose}>{"Forgot Password?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        If you forgot your password please contact an admin to get it reset.
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </Container>
    );
}

export default withSnackbar(Login);