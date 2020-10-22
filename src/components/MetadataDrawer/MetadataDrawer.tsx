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
import MetadataTable, {MetadataTableRow} from "../MetadataTable/MetadataTable";
import MetadataResponse from "../../shared/models/MetadataResponse";

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

interface MetadataDrawerProps {
    open: boolean;
    handleClose: any;
    table1Rows: Array<MetadataTableRow>;
    table2Rows: Array<MetadataTableRow>;
}

function MetadataDrawer(props: MetadataDrawerProps) {
    const classes = useStyles();

    return (
        <Drawer anchor={'bottom'} open={props.open} PaperProps={{className: classes.drawer}} onClose={props.handleClose}>
            <Grid container spacing={1} justify="center">
                <Grid item xs={6}>
                    <MetadataTable columns={columns} rows={props.table1Rows} />
                </Grid>
                <Grid item xs={6}>
                    <MetadataTable columns={columns} rows={props.table2Rows} />
                </Grid>
            </Grid>
        </Drawer>
    );
}

export default MetadataDrawer;