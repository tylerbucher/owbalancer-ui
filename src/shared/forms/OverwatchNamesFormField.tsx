import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import React, {useEffect} from "react";
import {OverwatchNamesHelperText1, OverwatchNamesHelperText2} from "./FormData"

function OverwatchNamesFormField(props: any) {
    const [values, setValues] = React.useState(new Array<string>());

    useEffect(() => {
        props.submitCallBack.owNamesCallBack = reset;
        if (props.userModel.names !== undefined) {
            setValues(props.userModel.names);
        }
    }, [props.submitCallBack.owNamesCallBack, props.userModel.names]);
    const reset = () => {
        setValues(new Array<string>());
    };

    return (
        <Grid container spacing={1} justify="center">
            <Grid item xs={9} className={props.className}>
                <Typography variant="h6">
                    Overwatch Username(s)
                </Typography>
                <Autocomplete
                    multiple
                    fullWidth
                    id="tags-filled"
                    options={new Array<string>()}
                    freeSolo
                    value={values}
                    onChange={function (e, value, a) {
                        let newVals = new Array<string>();
                        value.forEach(val => {
                            let rVal = val.replace(/ /g, "")
                            if (!newVals.includes(rVal)) {
                                newVals.push(rVal);
                            }
                        });
                        setValues(newVals);
                        props.userModel.names = newVals;
                    }}
                    renderTags={(value: string[], getTagProps) =>
                        value.map((option: string, index: number) => (
                            <Chip variant="outlined" label={option} {...getTagProps({index})} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="Overwatch Username(s)"
                                   placeholder="Overwatch Username(s)"
                                   helperText={props.enableSecondHelperText === true ?
                                       <div>{OverwatchNamesHelperText1}<br/>{OverwatchNamesHelperText2}
                                       </div> : OverwatchNamesHelperText1}
                        />
                    )}
                    autoSelect
                    disabled={props.disabled === undefined ? false : props.disabled}
                />
            </Grid>
        </Grid>
    );
}

export default OverwatchNamesFormField;
