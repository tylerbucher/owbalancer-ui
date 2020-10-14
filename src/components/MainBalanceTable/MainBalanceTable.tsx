import CustomTable, {StyledTableCell, StyledTableRow} from "../CustomTable/CustomTable";
import TableCell from "@material-ui/core/TableCell";
import React from "react";

interface MainBalanceTableColumn {
    value: string;
    align: boolean;
}

interface MainBalanceTableRow {
    id: number;
    role: string;
    username: string;
    sr: number;
    tank: JSX.Element;
    dps: JSX.Element;
    support: JSX.Element;
}

interface MainBalanceTableProps {
    columns: Array<MainBalanceTableColumn>;
    rows: Array<MainBalanceTableRow>;
}

function MainBalancerTable(props: MainBalanceTableProps) {
    return <CustomTable columnFunction={
        function () {
            return props.columns.map((column) => (
                <TableCell align={column.align ? 'right' : 'left'}>{column.value}</TableCell>
            ))
        }
    } rowFunction={
        function () {
            return props.rows.map((row) => (
                <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">{row.role}</StyledTableCell>
                    <StyledTableCell align="right">{row.username}</StyledTableCell>
                    <StyledTableCell align="right">{row.sr}</StyledTableCell>
                    <StyledTableCell align="right">{row.tank}</StyledTableCell>
                    <StyledTableCell align="right">{row.dps}</StyledTableCell>
                    <StyledTableCell align="right">{row.support}</StyledTableCell>
                </StyledTableRow>
            ))
        }
    }/>
}

export default MainBalancerTable;