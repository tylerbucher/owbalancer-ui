import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import React from "react";
import {OverwatchNamesHelperText1, OverwatchNamesHelperText2} from "./FormData"

interface OverwatchNamesFormFieldProps {
    className?: string;
    enableSecondHelperText?: boolean;
}

function OverwatchNamesFormField(props: OverwatchNamesFormFieldProps) {
    return (
        <Grid container spacing={1} justify="center">
            <Grid item xs={9} className={props.className}>
                <Typography variant="h6">
                    Overwatch Username(s)
                </Typography>
                <Autocomplete
                    multiple
                    id="tags-filled"
                    options={new Array<string>()}
                    defaultValue={[]}
                    freeSolo

                    onChange={function (e, vale, a) {
                        console.log(e)
                    }}
                    renderTags={(value: string[], getTagProps) =>
                        value.map((option: string, index: number) => (
                            <Chip variant="outlined" label={option} {...getTagProps({index})} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="Overwatch Username(s)"
                                   placeholder="Overwatch Username(s)"
                                   helperText={props.enableSecondHelperText === true ? <div>{OverwatchNamesHelperText1}<br/>{OverwatchNamesHelperText2}</div> : OverwatchNamesHelperText1}
                        />
                    )}
                />
            </Grid>
        </Grid>
    );
}

export default OverwatchNamesFormField;
