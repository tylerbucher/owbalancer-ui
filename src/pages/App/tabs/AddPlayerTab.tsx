import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {PrimaryRolePriority, SecondaryRolePriority, NonRolePriority, roleToolTip} from "./shared/FormData";
import RolesFormField from "./shared/RolesFormField";
import DiscordNameFormField from "./shared/DiscordNameFormField";
import OverwatchNamesFormField from "./shared/OverwatchNamesFormField";
import postNewUser, {PostNewUserRequest} from "../../../rest/PostNewUser";
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

class CallBacks {
    public discordNameCallBack: any;
    public owNamesCallBack: any;
    public rolesCallBack: any;
}

function AddPlayerTab(props: any) {
    const classes = useStyles();
    const [addPlayerRequest, setAddPlayerRequest] = React.useState<PostNewUserRequest>(new PostNewUserRequest());
    const [callbacks, setCallbacks] = React.useState(new CallBacks());

    const handleSubmit = () => {
        postNewUser(addPlayerRequest, props);
        if(callbacks.discordNameCallBack !== undefined) {
            callbacks.discordNameCallBack();
        }
        if(callbacks.owNamesCallBack !== undefined) {
            callbacks.owNamesCallBack();
        }
        if(callbacks.rolesCallBack !== undefined) {
            callbacks.rolesCallBack();
        }
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
                <DiscordNameFormField className={classes.form} basicUserList={props.basicUserList} setAddPlayerRequest={addPlayerRequest} submitCallBack={callbacks}/>
                <OverwatchNamesFormField className={classes.form} setAddPlayerRequest={addPlayerRequest} submitCallBack={callbacks} enableSecondHelperText/>
                <RolesFormField className={classes.form} setAddPlayerRequest={addPlayerRequest} submitCallBack={callbacks}/>
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