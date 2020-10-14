import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import Tooltip from "@material-ui/core/Tooltip";
import {
    NonRolePriority,
    PrimaryRolePriority,
    roleToolTip,
    SecondaryRolePriority
} from "./FormData";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import React from "react";
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
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number.parseInt((event.target as HTMLInputElement).value));
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
                />
                <FormLabel component="legend" className={classes.iconAlign}>
                    Role Priority
                    <Tooltip title={roleToolTip} interactive placement="right" arrow className={classes.tooltip}>
                        <InfoOutlinedIcon fontSize={"small"}/>
                    </Tooltip>
                </FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <FormControlLabel value={PrimaryRolePriority.value} control={<Radio/>} label={PrimaryRolePriority.fullName}/>
                    <FormControlLabel value={SecondaryRolePriority.value} control={<Radio/>} label={SecondaryRolePriority.fullName}/>
                    <FormControlLabel value={NonRolePriority.value} control={<Radio/>} label={NonRolePriority.fullName}/>
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
                />
                <FormLabel component="legend">Role Priority</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <FormControlLabel value={PrimaryRolePriority.value} control={<Radio/>} label={PrimaryRolePriority.fullName}/>
                    <FormControlLabel value={SecondaryRolePriority.value} control={<Radio/>} label={SecondaryRolePriority.fullName}/>
                    <FormControlLabel value={NonRolePriority.value} control={<Radio/>} label={NonRolePriority.fullName}/>
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
                />
                <FormLabel component="legend">Role Priority</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <FormControlLabel value={PrimaryRolePriority.value} control={<Radio/>} label={PrimaryRolePriority.fullName}/>
                    <FormControlLabel value={SecondaryRolePriority.value} control={<Radio/>} label={SecondaryRolePriority.fullName}/>
                    <FormControlLabel value={NonRolePriority.value} control={<Radio/>} label={NonRolePriority.fullName}/>
                </RadioGroup>
            </Grid>
        </Grid>
    );
}

export default RolesFormField;