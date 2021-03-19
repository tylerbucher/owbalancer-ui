import React, {ChangeEvent} from "react";
import {withSnackbar} from "notistack";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {useHistory} from "react-router-dom";
import {PostNewUserModel} from "../../shared/rest/models/PostNewUserModel";
import postNewUser from "../../shared/rest/PostNewUser";
import CheckCircleOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';

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
            textAlign: 'center'
        },
        formGroup: {
            width: "100%",
            flexDirection: "row"
        },
        floatRight: {
            marginLeft: "auto",
            order: 2
        },
        iconSize: {
            fontSize: '96px'
        }
    }),
);

function CreateAccount(props: any) {
    const classes = useStyles();
    const history = useHistory();
    const [model] = React.useState(new PostNewUserModel("", "", "", ""));
    const [accountCreated, setAccountCreated] = React.useState(false);

    const handleSubmit = () => {
        postNewUser(model, props, onCreate)
    };
    const onCreate = () => {
        setAccountCreated(true);
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        model.email = event.target.value;
    };
    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        model.username = event.target.value;
    };
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        model.password = event.target.value;
    };
    const handleRePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        model.passwordConfirm = event.target.value;
    };

    function goToLogin() {
        history.push("/login");
    }

    return accountCreated ? (
        <Container maxWidth="md" className={classes.root}>
            <form noValidate autoComplete="off" className={classes.form}>
                <Grid container spacing={1} justify="center">
                    <Grid item xs={12} className={classes.form}>
                        <CheckCircleOutlinedIcon fontSize='inherit' className={classes.iconSize}/>
                        <Typography variant="h4" align='center'>
                            <i>Thank you for creating your account</i>
                        </Typography>
                        <Typography variant="body2" align='center'>
                            Your account has been created. Please wait for an admin to activate your account
                            before logging in.
                        </Typography>
                        <Button variant="outlined" color="primary" onClick={goToLogin}>
                            Back to Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    ) : (
        <Container maxWidth="sm" className={classes.root}>
            <form noValidate autoComplete="off" className={classes.form}>
                <Grid container spacing={1} justify="center">
                    <Grid item xs={8} className={classes.form}>
                        <Typography variant="h4">
                            Create Account
                        </Typography>
                        <Typography variant="body2">
                            Create an account to use the custom game balancer
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
                            label="Username"
                            type="text"
                            variant={"outlined"}
                            onChange={handleUsernameChange}
                        />
                        <TextField
                            fullWidth
                            id="name"
                            label="Password"
                            type="password"
                            variant={"outlined"}
                            onChange={handlePasswordChange}
                        />
                        <TextField
                            fullWidth
                            id="name"
                            label="Confirm Password"
                            type="password"
                            variant={"outlined"}
                            onChange={handleRePasswordChange}
                        />
                        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                            Create Account
                        </Button>
                        <FormGroup className={classes.formGroup}>
                            <Button size="small" onClick={goToLogin}>
                                Login
                            </Button>
                        </FormGroup>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default withSnackbar(CreateAccount);