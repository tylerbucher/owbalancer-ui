import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table, {TableProps} from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

export const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            }
        },
    }),
)(TableRow);

interface CustomTableProps {
    columnFunction: any;
    rowFunction: any;
    enableOddColor?: boolean;
    tableProps?: TableProps;
}

function CustomTable(props: CustomTableProps) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} >
            <Table className={classes.table} aria-label="simple table" {...props.tableProps}>
                <TableHead>
                    <TableRow>
                        {props.columnFunction()}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rowFunction()}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CustomTable;