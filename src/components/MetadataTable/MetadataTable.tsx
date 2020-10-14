import CustomTable, {StyledTableCell, StyledTableRow} from "../CustomTable/CustomTable";
import TableCell from "@material-ui/core/TableCell";
import React from "react";

interface MetadataTableColumn {
    value: string;
}

interface MetadataTableRow {
    key: string;
    value: string;
}

interface MainBalanceTableProps {
    columns: Array<MetadataTableColumn>;
    rows: Array<MetadataTableRow>;
}

function MetadataTable(props: MainBalanceTableProps) {
    return <CustomTable columnFunction={
        function () {
            return props.columns.map((column) => (
                <TableCell align={'left'}>{column.value}</TableCell>
            ))
        }
    } rowFunction={
        function () {
            return props.rows.map((row) => (
                <StyledTableRow>
                    <StyledTableCell component="th" scope="row">{row.key}</StyledTableCell>
                    <StyledTableCell align="left">{row.value}</StyledTableCell>
                </StyledTableRow>
            ))
        }
    } tableProps={{size: "small"}}/>
}

export default MetadataTable;