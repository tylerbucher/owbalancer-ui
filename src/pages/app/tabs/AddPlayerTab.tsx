import React from "react";
import Button from '@material-ui/core/Button';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import RolesFormField from "../../../shared/forms/RolesFormField";
import DiscordNameFormField from "../../../shared/forms/DiscordNameFormField";
import OverwatchNamesFormField from "../../../shared/forms/OverwatchNamesFormField";
import {withSnackbar} from "notistack";
import {PostNewUserModel, PostNewUserModelApi} from "../../../shared/rest/models/PostNewUserModel";
import postNewUser from "../../../shared/rest/PostNewUser";

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

function AddPlayerTab(props: any) {
    const classes = useStyles();
    const [addPlayerRequest] = React.useState<PostNewUserModelApi>(new PostNewUserModel());
    const [callbacks] = React.useState(new CallBacks());

    const handleSubmit = () => {
        postNewUser(addPlayerRequest, props, reset);
    };

    const reset = () => {
        if (callbacks.discordNameCallBack !== undefined) {
            callbacks.discordNameCallBack();
        }
        if (callbacks.owNamesCallBack !== undefined) {
            callbacks.owNamesCallBack();
        }
        if (callbacks.rolesCallBack !== undefined) {
            callbacks.rolesCallBack();
        }
        props.onUserListUpdate();
    };

    return (
        <Container maxWidth="md" className={classes.root}>
            <form noValidate autoComplete="off" className={classes.form} id={"asd"}>
                <Grid container spacing={1} justify="center">
                    <Grid item xs={9} className={classes.form}>
                        <Typography variant="h4" gutterBottom>
                            Add New Player
                        </Typography>
                    </Grid>
                </Grid>
                <DiscordNameFormField className={classes.form} basicUserList={props.basicUserList}
                                      userModel={addPlayerRequest} submitCallBack={callbacks} autoFocus/>
                <OverwatchNamesFormField className={classes.form} userModel={addPlayerRequest}
                                         submitCallBack={callbacks} enableSecondHelperText/>
                <RolesFormField className={classes.form} userModel={addPlayerRequest}
                                submitCallBack={callbacks}/>
                <Grid container spacing={1} justify="center">
                    <Grid item xs={9} className={classes.form}>
                        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default withSnackbar(AddPlayerTab);