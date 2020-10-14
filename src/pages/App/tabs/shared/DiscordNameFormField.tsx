import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import React from "react";
import {DiscordNameHelperText} from "./FormData";

function DiscordNameFormField(props: any) {
    return (
        <Grid container spacing={1} justify="center">
            <Grid item xs={9} className={props.className}>
                <Typography variant="h6">
                    Discord Username
                </Typography>
                <TextField
                    autoFocus
                    id="name"
                    label="Discord Name"
                    type="text"
                    variant="outlined"
                    helperText={DiscordNameHelperText}
                />
            </Grid>
        </Grid>
    );
}

export default DiscordNameFormField;