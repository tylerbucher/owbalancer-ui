import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import React, {useEffect} from "react";
import {DiscordNameHelperText} from "./FormData";
import refreshPlayers from "../../../../components/ActionMenu/actions/RefreshPlayers";

function GetPossibleNames(userList: any, value: string): Array<string> {
    let nameArray = new Array<string>();
    for (let obj of userList) {
        if (obj.discordName.toUpperCase().includes(value.toUpperCase())) {
            nameArray.push(obj.discordName);
            if (nameArray.length > 4) {
                break;
            }
        }
    }
    return nameArray;
}

function DiscordNameFormField(props: any) {
    const [error, setError] = React.useState(false);
    const [errorText, setErrorText] = React.useState("");

    const [value, setValue] = React.useState("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        props.setAddPlayerRequest.username = event.target.value;

        let nameArray = GetPossibleNames(props.basicUserList, event.target.value)
        if (nameArray.length !== 0 && event.target.value.length > 0) {
            setError(true);
            setErrorText("Users with a similar name: " + nameArray.join(", "))
        } else {
            setError(false);
        }

    };
    const handleFocusLost = (event: React.FocusEvent<HTMLInputElement>) => {
        setError(false);
    };
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        if (value.length > 0) {
            let nameArray = GetPossibleNames(props.basicUserList, event.target.value);
            if (nameArray.length !== 0) {
                setError(true);
                setErrorText("Users with a similar name: " + nameArray.join(", "))
            }
        }
    };

    useEffect(()=>{
        props.submitCallBack.discordNameCallBack = reset;
    });
    const reset = () => {
        setValue("");
        setError(false);
        setErrorText("");
    };

    return (
        <Grid container spacing={1} justify="center">
            <Grid item xs={9} className={props.className}>
                <Typography variant="h6">
                    Discord Username
                </Typography>
                <TextField
                    autoFocus
                    fullWidth
                    id="name"
                    label="Discord Name"
                    type="text"
                    variant="outlined"
                    helperText={error ? errorText : DiscordNameHelperText}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleFocusLost}
                    onFocus={handleFocus}
                    error={error}
                />
            </Grid>
        </Grid>
    );
}

export default DiscordNameFormField;