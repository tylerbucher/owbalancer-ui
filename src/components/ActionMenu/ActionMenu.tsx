import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import CloseIcon from "@material-ui/icons/Close";
import RefreshIcon from "@material-ui/icons/Refresh";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import GetAppIcon from "@material-ui/icons/GetApp";
import PublishIcon from "@material-ui/icons/Publish";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import { useSnackbar, withSnackbar } from 'notistack';
import changeDarkMode from "./actions/ChangeDarkMode";
import refreshPlayers from "./actions/RefreshPlayers";

const useStyles = makeStyles((theme: Theme) =>

    createStyles({
        speedDial: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        fab: {
            backgroundImage: theme.palette.type === "light" ?
                "linear-gradient( 136deg, rgb(33,203,243) 30%, rgb(33,150,243) 90%)" :
                "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)"
        }
    }),
);

function ActionMenu(props: any) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const actions = [
        {icon: <RefreshIcon/>, name: 'Refresh', action: function (props:any){props.onUserListUpdate()}},
        {icon: <Brightness2Icon/>, name: 'Dark Mode', action: function (props:any){changeDarkMode(props.parentStateChange);}},
    ];

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                className={classes.speedDial}
                hidden={false}
                icon={<SpeedDialIcon icon={<ExpandLessIcon/>} openIcon={<CloseIcon/>}/>}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                FabProps={{className: classes.fab}}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={(function (){handleClose(); action.action(props)})}
                    />
                ))}
            </SpeedDial>
        </div>
    );
}

export default withSnackbar(ActionMenu)