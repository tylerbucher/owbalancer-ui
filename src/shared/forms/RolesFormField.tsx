import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import Tooltip from "@material-ui/core/Tooltip";
import {
    DpsRoleDefault,
    NonRolePriority,
    PrimaryRolePriority,
    roleToolTip,
    SecondaryRolePriority,
    SupportRoleDefault,
    TankRoleDefault
} from "./FormData";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import React, {useEffect} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        iconAlign: {
            display: "flex",
            alignItems: "center"
        },
        tooltip: {
            marginLeft: theme.spacing(0.5),
            maxWidth: 300
        }
    }),
);

function RolesFormField(props: any) {
    const classes = useStyles();
    const [tankSr, setTankSr] = React.useState(-1);
    const [tankOption, setTankOption] = React.useState(TankRoleDefault);

    const [dpsSr, setDpsSr] = React.useState(-1);
    const [dpsOption, setDpsOption] = React.useState(DpsRoleDefault);

    const [supportSr, setSupportSr] = React.useState(-1);
    const [supportOption, setSupportOption] = React.useState(SupportRoleDefault);

    const handleTankSrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let val = parseInt(event.target.value);
        setTankSr(Number.isNaN(val) ? -1 : val);
        props.userModel.tankSr = Number.isNaN(val) ? -1 : val;
    };
    const handleTankChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTankOption(Number.parseInt((event.target as HTMLInputElement).value));
        props.userModel.tankPreference = Number.parseInt((event.target as HTMLInputElement).value);
    };

    const handleDpsSrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let val = parseInt(event.target.value);
        setDpsSr(Number.isNaN(val) ? -1 : val);
        props.userModel.dpsSr = Number.isNaN(val) ? -1 : val;
    };
    const handleDpsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDpsOption(Number.parseInt((event.target as HTMLInputElement).value));
        props.userModel.dpsPreference = Number.parseInt((event.target as HTMLInputElement).value);
    };

    const handleSupportSrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let val = parseInt(event.target.value);
        setSupportSr(Number.isNaN(val) ? -1 : val);
        props.userModel.supportSr = Number.isNaN(val) ? -1 : val;
    };
    const handleSupportChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSupportOption(Number.parseInt((event.target as HTMLInputElement).value));
        props.userModel.supportPreference = Number.parseInt((event.target as HTMLInputElement).value);
    };

    useEffect(() => {
        props.submitCallBack.rolesCallBack = reset;

        if(props.userModel.tankSr !== undefined) setTankSr(props.userModel.tankSr);
        if(props.userModel.tankPreference !== undefined) setTankOption(props.userModel.tankPreference);

        if(props.userModel.dpsSr !== undefined) setDpsSr(props.userModel.dpsSr);
        if(props.userModel.dpsPreference !== undefined) setDpsOption(props.userModel.dpsPreference);

        if(props.userModel.supportSr !== undefined) setSupportSr(props.userModel.supportSr);
        if(props.userModel.supportPreference !== undefined) setSupportOption(props.userModel.supportPreference);
    }, [
        props.submitCallBack.rolesCallBack,
        props.userModel.tankSr,
        props.userModel.tankPreference,
        props.userModel.dpsSr,
        props.userModel.dpsPreference,
        props.userModel.supportSr,
        props.userModel.supportPreference
    ]);
    const reset = () => {
        setTankSr(-1);
        setDpsSr(-1);
        setSupportSr(-1);

        setTankOption(TankRoleDefault);
        setDpsOption(DpsRoleDefault);
        setSupportOption(SupportRoleDefault);
    };

    return (
        <Grid container spacing={1} justify="center">
            <Grid item xs={3} className={props.className}>
                <Typography variant="h6">
                    Tank
                </Typography>
                <TextField
                    id="standard-basic"
                    label="SR (0 - 5000)"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={tankSr === -1 ? "" : tankSr}
                    onChange={handleTankSrChange}
                    disabled={props.disabled === undefined ? false : props.disabled}
                />
                <FormLabel component="legend" className={classes.iconAlign}>
                    Role Priority
                    <Tooltip title={roleToolTip} interactive placement="right" arrow className={classes.tooltip}>
                        <InfoOutlinedIcon fontSize={"small"}/>
                    </Tooltip>
                </FormLabel>
                <RadioGroup id="tankPriority" value={tankOption} onChange={handleTankChange} tabIndex={2}>
                    <FormControlLabel value={PrimaryRolePriority.value} control={<Radio/>}
                                      label={PrimaryRolePriority.fullName} disabled={props.disabled === undefined ? false : props.disabled}/>
                    <FormControlLabel value={SecondaryRolePriority.value} control={<Radio/>}
                                      label={SecondaryRolePriority.fullName} disabled={props.disabled === undefined ? false : props.disabled}/>
                    <FormControlLabel value={NonRolePriority.value} control={<Radio/>}
                                      label={NonRolePriority.fullName} disabled={props.disabled === undefined ? false : props.disabled}/>
                </RadioGroup>
            </Grid>
            <Grid item xs={3} className={props.className}>
                <Typography variant="h6">
                    DPS
                </Typography>
                <TextField
                    id="standard-basic"
                    label="SR (0 - 5000)"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={dpsSr === -1 ? "" : dpsSr}
                    onChange={handleDpsSrChange}
                    disabled={props.disabled === undefined ? false : props.disabled}
                />
                <FormLabel component="legend">Role Priority</FormLabel>
                <RadioGroup id="dpsPriority" value={dpsOption} onChange={handleDpsChange}>
                    <FormControlLabel value={PrimaryRolePriority.value} control={<Radio/>}
                                      label={PrimaryRolePriority.fullName} disabled={props.disabled === undefined ? false : props.disabled}/>
                    <FormControlLabel value={SecondaryRolePriority.value} control={<Radio/>}
                                      label={SecondaryRolePriority.fullName} disabled={props.disabled === undefined ? false : props.disabled}/>
                    <FormControlLabel value={NonRolePriority.value} control={<Radio/>}
                                      label={NonRolePriority.fullName} disabled={props.disabled === undefined ? false : props.disabled}/>
                </RadioGroup>
            </Grid>
            <Grid item xs={3} className={props.className}>
                <Typography variant="h6">
                    Support
                </Typography>
                <TextField
                    id="standard-basic"
                    label="SR (0 - 5000)"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={supportSr === -1 ? "" : supportSr}
                    onChange={handleSupportSrChange}
                    disabled={props.disabled === undefined ? false : props.disabled}
                />
                <FormLabel component="legend">Role Priority</FormLabel>
                <RadioGroup id="supportPriority" value={supportOption} onChange={handleSupportChange}>
                    <FormControlLabel value={PrimaryRolePriority.value} control={<Radio/>}
                                      label={PrimaryRolePriority.fullName} disabled={props.disabled === undefined ? false : props.disabled}/>
                    <FormControlLabel value={SecondaryRolePriority.value} control={<Radio/>}
                                      label={SecondaryRolePriority.fullName} disabled={props.disabled === undefined ? false : props.disabled}/>
                    <FormControlLabel value={NonRolePriority.value} control={<Radio/>}
                                      label={NonRolePriority.fullName} disabled={props.disabled === undefined ? false : props.disabled}/>
                </RadioGroup>
            </Grid>
        </Grid>
    );
}

export default RolesFormField;