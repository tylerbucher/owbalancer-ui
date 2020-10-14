import React from 'react';
import clsx from 'clsx';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Grid from "@material-ui/core/Grid";
import MainBalancerTable from "../MainBalanceTable/MainBalanceTable";
import MetadataTable from "../MetadataTable/MetadataTable";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            padding: theme.spacing(2)
        }
    }),
);

const columns = [
    {value:"Key", align:false},
    {value:"Value", align:false},
];

function createData(key: string, value: string) {
    return {key, value};
}

const rows = [
    createData("Balance Score", "13.619318"),
    createData("Average SR", "2438 (Δ -126)"),
    createData("└─ Total SR", "14631"),
    createData("Average SR (All roles)", "2299 (Δ -146)"),
    createData("└─ Total SR (All roles)", "41385"),
    createData("Adaptability (How well the team can adapt to playing different roles)", "50%"),
    createData("├─ Tank Adaptability", "41%"),
    createData("├─ DPS Adaptability", "50%"),
    createData("└─ Support Adaptability", "58%"),
];

interface MetadataDrawerProps {
    open: boolean;
    handleClose: any;
}

function MetadataDrawer(props: MetadataDrawerProps) {
    const classes = useStyles();

    return (
        <Drawer anchor={'bottom'} open={props.open} PaperProps={{className: classes.drawer}} onClose={props.handleClose}>
            <Grid container spacing={1} justify="center">
                <Grid item xs={6}>
                    <MetadataTable columns={columns} rows={rows} />
                </Grid>
                <Grid item xs={6}>
                    <MetadataTable columns={columns} rows={rows} />
                </Grid>
            </Grid>
        </Drawer>
    );
}

export default MetadataDrawer;