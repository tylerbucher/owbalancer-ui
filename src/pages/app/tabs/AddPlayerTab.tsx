import React from "react";
import Button from '@material-ui/core/Button';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import RolesFormField from "../../../shared/forms/RolesFormField";
import PlayerNameFormField from "../../../shared/forms/PlayerNameFormField";
import OverwatchNamesFormField from "../../../shared/forms/OverwatchNamesFormField";
import {withSnackbar} from "notistack";
import {PostNewPlayerModel, PostNewPlayerModelApi} from "../../../shared/rest/models/PostNewPlayerModel";
import {canAddMorePlayers} from "../../../utilities/Permissions";
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

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
        nonAdminForm: {
            '& > *': {
                margin: theme.spacing(1),
                marginLeft: 0
            },
            textAlign: 'center'
        },
        iconSize: {
            fontSize: '96px'
        }
    }),
);

class CallBacks {
    public discordNameCallBack: any;
    public owNamesCallBack: any;
    public rolesCallBack: any;
    public userSelectCallBack: any;
}

function checkAccess(props: any) {
    return props.userModel.playerCount < props.userModel.maxPlayersPerUser || canAddMorePlayers(props.userModel.permissions);
}

function AddPlayerTab(props: any) {
    const classes = useStyles();
    const [addPlayerRequest] = React.useState<PostNewPlayerModelApi>(new PostNewPlayerModel());
    const [callbacks] = React.useState(new CallBacks());

    const handleSubmit = () => {
        const playerString = localStorage.getItem("players");
        let players: PostNewPlayerModelApi[] = [];
        if (playerString !== null) {
            players = JSON.parse(playerString) as PostNewPlayerModelApi[]
        }
        addPlayerRequest.userId = uuidv4()
        players.push(addPlayerRequest)
        localStorage.setItem("players", JSON.stringify(players))
        reset()
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
        if (callbacks.userSelectCallBack !== undefined) {
            callbacks.userSelectCallBack();
        }
        addPlayerRequest.reset();
    };

    return (<Container maxWidth="md" className={classes.root}>
        <form noValidate autoComplete="off" className={classes.form} id={"asd"}>
            <Grid container spacing={1} justify="center">
                <Grid item xs={9} className={classes.form}>
                    <Typography variant="h4" gutterBottom>
                        Add New Player
                    </Typography>
                </Grid>
            </Grid>
            <PlayerNameFormField className={classes.form} basicUserList={props.basicUserList}
                                 userModel={addPlayerRequest} submitCallBack={callbacks} autoFocus={false}/>
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
    </Container>);
}

export default withSnackbar(AddPlayerTab);