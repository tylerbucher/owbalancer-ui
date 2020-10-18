import CustomTable, {StyledTableCell, StyledTableRow} from "../CustomTable/CustomTable";
import TableCell from "@material-ui/core/TableCell";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    tableCell: {
        height: "58.5167px"
    },
});

interface MainBalanceTableColumn {
    value: string;
    align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}

interface MainBalanceTableRow {
    id?: number;
    role?: string;
    username?: string;
    sr?: number;
    tank?: JSX.Element;
    dps?: JSX.Element;
    support?: JSX.Element;
}

export function createData(id?: number, role?: string, username?: string, sr?: number, tank?: JSX.Element, dps?: JSX.Element, support?: JSX.Element): MainBalanceTableRow {
    return {id, role, username, sr, tank, dps, support};
}

export function insertBlankRow() {
    return createData(undefined, undefined, undefined, undefined, undefined, undefined, undefined);
}

export const emptyRows = [
    insertBlankRow(),
    insertBlankRow(),
    insertBlankRow(),
    insertBlankRow(),
    insertBlankRow(),
    insertBlankRow()
];

interface MainBalanceTableProps {
    rows: Array<MainBalanceTableRow>;
}

function MainBalancerTable(props: MainBalanceTableProps) {
    const classes = useStyles();

    return <CustomTable columnFunction={
        function () {
            return [
                <TableCell align={'left'}>Role</TableCell>,
                <TableCell align={'left'}>Username</TableCell>,
                <TableCell align={'right'}>Sr</TableCell>,
                <TableCell align={'right'}>Tank</TableCell>,
                <TableCell align={'right'}>DPS</TableCell>,
                <TableCell align={'center'}>Support</TableCell>
            ];
        }
    } rowFunction={
        function () {
            return props.rows.map((row) => (
                <StyledTableRow key={row.id} className={classes.tableCell}>
                    <StyledTableCell component="th" scope="row">{row.role}</StyledTableCell>
                    <StyledTableCell align="left" >{row.username}</StyledTableCell>
                    <StyledTableCell align="right">{row.sr}</StyledTableCell>
                    <StyledTableCell align="right">{row.tank}</StyledTableCell>
                    <StyledTableCell align="right">{row.dps}</StyledTableCell>
                    <StyledTableCell align="center">{row.support}</StyledTableCell>
                </StyledTableRow>
            ))
        }
    }/>
}

export default MainBalancerTable;