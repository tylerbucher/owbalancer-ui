import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import MainBalancerTable, {
    createData,
    emptyRows,
    insertBlankRow
} from "../../../components/MainBalanceTable/MainBalanceTable";
import MetadataDrawer from "../../../components/MetadataDrawer/MetadataDrawer";
import balance from "../../../shared/rest/PostBalance";
import {withSnackbar} from "notistack";
import {createData as createMetaData, MetadataTableRow} from "../../../components/MetadataTable/MetadataTable";
import Pagination from '@material-ui/lab/Pagination';
import {BasicTagPlayerModel, BasicTagPlayerModelApi} from "../../../shared/models/BasicTagPlayerModel";
import {BasicUserModelApi} from "../../../shared/rest/models/BasicUserModel";
import {BalanceResponseModel} from "../../../shared/rest/models/BalanceResponseModel";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainContent: {
            height: "100vh",
            display: "flex",
            flexFlow: "column"
        },
        card: {
            minWidth: "275"
        },
        avatar: {
            backgroundColor: "#f12315",
        },
        root: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        },
        table: {
            minWidth: 750,
        },
        paper: {
            padding: theme.spacing(2),
            '& > *': {
                marginBottom: theme.spacing(1),
            },
            backgroundColor: theme.palette.type === 'dark' ? '#333' : '#fff'
        },
        fRight: {
            display: "contents"
        }
    }),
);

interface BalanceTableRow {
    id?: number;
    role?: string;
    username?: string;
    sr?: number;
    tank?: JSX.Element;
    dps?: JSX.Element;
    support?: JSX.Element;
}

export function invertedUserList(userList: Array<BasicUserModelApi>): Array<BasicTagPlayerModelApi> {
    let iUserList = new Array<BasicTagPlayerModelApi>();
    userList.forEach((user) => {
        iUserList.push(new BasicTagPlayerModel(user.id, user.discordName, user.discordName));
        user.overwatchNames.forEach((name) => {
            if (name.toUpperCase() !== user.discordName.toUpperCase()) {
                iUserList.push(new BasicTagPlayerModel(user.id, name, user.discordName));
            }
        });
    });
    iUserList.sort((a, b) => {
        return a.discordName.localeCompare(b.discordName);
    });
    return iUserList;
}

function createMainTableRows(balanceResponse: BalanceResponseModel, users: Array<BasicTagPlayerModelApi>, tableId: number, currentPage: number): Array<BalanceTableRow> {
    let tblRows = new Array<BalanceTableRow>();
    balanceResponse.balanceList[currentPage].sort((a, b) => {
        return a.position - b.position;
    });
    balanceResponse.balanceList[currentPage].forEach((player, index) => {
        if (player.team === tableId) {
            let user = users.find(tag => tag.id === player.user.id)
            tblRows.push(
                createData(
                    index,
                    player.getPositionName(),
                    user !== undefined ? user.overwatchName : player.user.name,
                    player.getPositionSr(),
                    player.getTankPosIcon(),
                    player.getDpsPosIcon(),
                    player.getSupportPosIcon()
                )
            );
        }
    });
    while (tblRows.length !== 6) {
        tblRows.push(insertBlankRow());
    }
    return tblRows;
}

function createMetaTableRows(balanceResponse: BalanceResponseModel, tableId: number, currentPage: number): Array<MetadataTableRow> {
    let tblRows = new Array<MetadataTableRow>();
    let metaResponse = balanceResponse.metadataList[currentPage];

    if (tableId === 1) {
        tblRows.push(createMetaData("Balance Score", metaResponse.balanceScore.toString()));
    } else {
        tblRows.push(createMetaData("Balance Time", metaResponse.balanceTime.toString()));
    }
    let currTeam = tableId === 1 ? metaResponse.team1AverageSr : metaResponse.team2AverageSr;
    let otherTeam = tableId === 2 ? metaResponse.team1AverageSr : metaResponse.team2AverageSr;
    let currTeamTotal = tableId === 1 ? metaResponse.team1TotalAverageSr : metaResponse.team2TotalAverageSr
    let otherTeamTotal = tableId === 2 ? metaResponse.team1TotalAverageSr : metaResponse.team2TotalAverageSr

    tblRows.push(createMetaData("Average SR", (tableId === 1 ? metaResponse.team1AverageSr : metaResponse.team2AverageSr).toString() + ` (Δ ${currTeam - otherTeam})`));
    tblRows.push(createMetaData("└─ Total SR", (tableId === 1 ? metaResponse.team1TotalSr : metaResponse.team2TotalSr).toString()));
    tblRows.push(createMetaData("Average SR (All roles)", (tableId === 1 ? metaResponse.team1TotalAverageSr : metaResponse.team2TotalAverageSr).toString() + ` (Δ ${currTeamTotal - otherTeamTotal})`));
    tblRows.push(createMetaData("└─ Total SR (All roles)", (tableId === 1 ? metaResponse.team1TotalSrDistribution : metaResponse.team2TotalSrDistribution).toString()));
    tblRows.push(createMetaData("Adaptability (How well the team can adapt to playing different roles)", (tableId === 1 ? metaResponse.team1Adaptability : metaResponse.team2Adaptability).toString() + "%"));
    tblRows.push(createMetaData("├─ Tank Adaptability", (tableId === 1 ? metaResponse.team1TankAdaptability : metaResponse.team2TankAdaptability).toString() + "%"));
    tblRows.push(createMetaData("├─ DPS Adaptability", (tableId === 1 ? metaResponse.team1DpsAdaptability : metaResponse.team2DpsAdaptability).toString() + "%"));
    tblRows.push(createMetaData("└─ Support Adaptability", (tableId === 1 ? metaResponse.team1SupportAdaptability : metaResponse.team2SupportAdaptability).toString() + "%"));

    return tblRows;
}

function BalancerTab(props: any) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (open: boolean) => () => {
        setOpen(open);
    };

    const [numUsers, setNumUsers] = React.useState(0);
    const [users, setUsers] = React.useState(new Array<BasicTagPlayerModelApi>());
    const [currentPage, setCurrentPage] = React.useState(1);
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        if (balanceResponse !== undefined) {
            setCurrentPage(value);

            setCurrentTable1Rows(createMainTableRows(balanceResponse, users, 1, currentPage - 1));
            setCurrentTable2Rows(createMainTableRows(balanceResponse, users, 2, currentPage - 1));

            setCurrentMeta1Rows(createMetaTableRows(balanceResponse, 1, currentPage - 1));
            setCurrentMeta2Rows(createMetaTableRows(balanceResponse, 2, currentPage - 1));
        }
    };

    const [currentTable1Rows, setCurrentTable1Rows] = React.useState<Array<BalanceTableRow>>(emptyRows);
    const [currentTable2Rows, setCurrentTable2Rows] = React.useState<Array<BalanceTableRow>>(emptyRows);

    const [currentMeta1Rows, setCurrentMeta1Rows] = React.useState<Array<MetadataTableRow>>(new Array<MetadataTableRow>());
    const [currentMeta2Rows, setCurrentMeta2Rows] = React.useState<Array<MetadataTableRow>>(new Array<MetadataTableRow>());

    const [balanceResponse, setBalanceResponse] = React.useState<BalanceResponseModel>();
    const setResponse = (balanceResponse: BalanceResponseModel) => {
        setBalanceResponse(balanceResponse);
        setCurrentPage(1);

        setCurrentTable1Rows(createMainTableRows(balanceResponse, users, 1, currentPage - 1));
        setCurrentTable2Rows(createMainTableRows(balanceResponse, users, 2, currentPage - 1));

        setCurrentMeta1Rows(createMetaTableRows(balanceResponse, 1, currentPage - 1));
        setCurrentMeta2Rows(createMetaTableRows(balanceResponse, 2, currentPage - 1));
    };

    return (
        <Container maxWidth="lg" className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Grid container spacing={1} justify="center">
                    <Grid item xs={12}>
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            options={invertedUserList(props.basicUserList)}
                            getOptionLabel={(option: BasicTagPlayerModelApi) => option.overwatchName}
                            groupBy={(option: BasicTagPlayerModelApi) => option.discordName}
                            value={users}
                            getOptionSelected={((option, value) => {
                                return BasicTagPlayerModel.equals(option, value)
                            })}
                            filterSelectedOptions={true}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label={`Selected Users (${numUsers})`}
                                    placeholder="Selected Users"
                                />
                            )}
                            onChange={(event, value) => {
                                setNumUsers(value.length);
                                setUsers(value);
                            }}
                            openOnFocus
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1} justify="center">
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => {
                            balance(users, props, setResponse)
                        }}>
                            Balance
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={1} justify="center">
                    <Grid item xs={6}>
                        <MainBalancerTable rows={currentTable1Rows}/>
                    </Grid>
                    <Grid item xs={6}>
                        <MainBalancerTable rows={currentTable2Rows}/>
                    </Grid>
                </Grid>
                <Grid container spacing={1} justify="space-between" direction="row">
                    <Grid item xs={6}>
                        <Button variant="contained" color="secondary" onClick={toggleDrawer(true)}>
                            Balancer Metadata
                        </Button>
                    </Grid>
                    <Grid item xs={6} className={classes.fRight}>
                        <Pagination count={5} shape="rounded" page={currentPage} onChange={handlePageChange}/>
                    </Grid>
                </Grid>
            </Paper>
            <MetadataDrawer open={open} handleClose={toggleDrawer(false)} table1Rows={currentMeta1Rows}
                            table2Rows={currentMeta2Rows}/>
        </Container>
    );
}

export default withSnackbar(BalancerTab);