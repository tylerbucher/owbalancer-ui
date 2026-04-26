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
import {PostNewPlayerModelApi} from "../../../shared/rest/models/PostNewPlayerModel";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainContent: {
            height: "100vh",
            display: "flex",
            flexFlow: "column",
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
            justifyContent: "center",
            overflowY: "auto",
        },
        table: {
            minWidth: 750,
        },
        paper: {
            padding: theme.spacing(2),
            '& > *': {
                marginBottom: theme.spacing(1),
            },
            maxHeight: "100%"
        },
        fRight: {
            display: "contents"
        }
    }),
);

interface TopResult {
    perm: Int8Array;
    score: number;
    team1PositionPreferenceCount: number;
    team2PositionPreferenceCount: number;
    totalSRDifference: number;
    team1TotalSr: number;
    team1AverageSr: number;
    team1TotalSrDistribution: number;
    team1TotalAverageSr: number;
    team2TotalSr: number;
    team2AverageSr: number;
    team2TotalSrDistribution: number;
    team2TotalAverageSr: number;
}

interface BalanceResult {
    score: number;
    team1PositionPreferenceCount: number;
    team2PositionPreferenceCount: number;
    totalSRDifference: number;
    team1TotalSr: number;
    team1AverageSr: number;
    team1TotalSrDistribution: number;
    team1TotalAverageSr: number;
    team2TotalSr: number;
    team2AverageSr: number;
    team2TotalSrDistribution: number;
    team2TotalAverageSr: number;
}
interface BalanceTableRow {
    id?: number;
    role?: string;
    username?: string;
    sr?: number;
    tank?: JSX.Element;
    dps?: JSX.Element;
    support?: JSX.Element;
}

function calcSr(sr: number): number {
    return Math.floor((Math.tan(((Math.PI / 6000) * sr) - (((5.0 / 6.0) * Math.PI) / 2)) * 2500.0) + 2500.0);
}

function calcTeamRoleDifference(
    div: number,
    perm: Int8Array,
    players: PostNewPlayerModelApi[]
): {
    score: number;
    totalSRDifference: number;
    team1TotalSr: number;
    team1AverageSr: number;
    team1TotalSrDistribution: number;
    team1TotalAverageSr: number;
    team2TotalSr: number;
    team2AverageSr: number;
    team2TotalSrDistribution: number;
    team2TotalAverageSr: number;
} {
    // Raw SR (for totals/averages)
    const team1RawTankSr    = players[perm[0]].tankSr       + players[perm[1]].tankSr;
    const team1RawDpsSr     = players[perm[2]].dpsSr        + players[perm[3]].dpsSr;
    const team1RawSupportSr = players[perm[4]].supportSr    + players[perm[5]].supportSr;

    const team2RawTankSr    = players[perm[6]].tankSr       + players[perm[7]].tankSr;
    const team2RawDpsSr     = players[perm[8]].dpsSr        + players[perm[9]].dpsSr;
    const team2RawSupportSr = players[perm[10]].supportSr   + players[perm[11]].supportSr;

    // Calc SR (for balance scoring)
    const team1TankSr    = calcSr(players[perm[0]].tankSr)    + calcSr(players[perm[1]].tankSr);
    const team1DpsSr     = calcSr(players[perm[2]].dpsSr)     + calcSr(players[perm[3]].dpsSr);
    const team1SupportSr = calcSr(players[perm[4]].supportSr) + calcSr(players[perm[5]].supportSr);
    const team1Sr        = team1TankSr + team1DpsSr + team1SupportSr;

    const team2TankSr    = calcSr(players[perm[6]].tankSr)    + calcSr(players[perm[7]].tankSr);
    const team2DpsSr     = calcSr(players[perm[8]].dpsSr)     + calcSr(players[perm[9]].dpsSr);
    const team2SupportSr = calcSr(players[perm[10]].supportSr) + calcSr(players[perm[11]].supportSr);
    const team2Sr        = team2TankSr + team2DpsSr + team2SupportSr;

    const totalSRDifference =
        Math.abs(team1TankSr    - team2TankSr)    +
        Math.abs(team1DpsSr     - team2DpsSr)     +
        Math.abs(team1SupportSr - team2SupportSr);

    const maxSr = Math.max(team1Sr, team2Sr);
    const score = ((maxSr - totalSRDifference) * div) / maxSr;

    // Role SR totals (raw, for display)
    const team1TotalSr             = team1RawTankSr + team1RawDpsSr + team1RawSupportSr;
    const team2TotalSr             = team2RawTankSr + team2RawDpsSr + team2RawSupportSr;

    // TotalSrDistribution = sum of each player's raw SR across all roles
    const team1TotalSrDistribution =
        players[perm[0]].tankSr + players[perm[0]].dpsSr + players[perm[0]].supportSr +
        players[perm[1]].tankSr + players[perm[1]].dpsSr + players[perm[1]].supportSr +
        players[perm[2]].tankSr + players[perm[2]].dpsSr + players[perm[2]].supportSr +
        players[perm[3]].tankSr + players[perm[3]].dpsSr + players[perm[3]].supportSr +
        players[perm[4]].tankSr + players[perm[4]].dpsSr + players[perm[4]].supportSr +
        players[perm[5]].tankSr + players[perm[5]].dpsSr + players[perm[5]].supportSr;

    const team2TotalSrDistribution =
        players[perm[6]].tankSr  + players[perm[6]].dpsSr  + players[perm[6]].supportSr  +
        players[perm[7]].tankSr  + players[perm[7]].dpsSr  + players[perm[7]].supportSr  +
        players[perm[8]].tankSr  + players[perm[8]].dpsSr  + players[perm[8]].supportSr  +
        players[perm[9]].tankSr  + players[perm[9]].dpsSr  + players[perm[9]].supportSr  +
        players[perm[10]].tankSr + players[perm[10]].dpsSr + players[perm[10]].supportSr +
        players[perm[11]].tankSr + players[perm[11]].dpsSr + players[perm[11]].supportSr;

    return {
        score,
        totalSRDifference,
        team1TotalSr,
        team1AverageSr:          Math.round(team1TotalSr / 6),
        team1TotalSrDistribution,
        team1TotalAverageSr:     Math.round(team1TotalSrDistribution / 6),
        team2TotalSr,
        team2AverageSr:          Math.round(team2TotalSr / 6),
        team2TotalSrDistribution,
        team2TotalAverageSr:     Math.round(team2TotalSrDistribution / 6),
    };
}

function calcTeamPrimaryPosition(
    offset: number,
    perm: Int8Array,
    players: PostNewPlayerModelApi[]
): number {
    return players[perm[offset]].tankPreference +
        players[perm[offset + 1]].tankPreference +
        players[perm[offset + 2]].dpsPreference +
        players[perm[offset + 3]].dpsPreference +
        players[perm[offset + 4]].supportPreference +
        players[perm[offset + 5]].supportPreference;
}

function calcPlayerPrimaryScore(
    div: number,
    perm: Int8Array,
    players: PostNewPlayerModelApi[]
): { score: number; team1PositionPreferenceCount: number; team2PositionPreferenceCount: number } {
    const team1PositionPreferenceCount = calcTeamPrimaryPosition(0, perm, players);
    const team2PositionPreferenceCount = calcTeamPrimaryPosition(6, perm, players);
    const score = ((team1PositionPreferenceCount + team2PositionPreferenceCount) * div) / 24.0;

    return { score, team1PositionPreferenceCount, team2PositionPreferenceCount };
}



function mbalance(perm: Int8Array, players: PostNewPlayerModelApi[]): BalanceResult {
    const roleResult = calcTeamRoleDifference(1, perm, players);
    const prefResult = calcPlayerPrimaryScore(2, perm, players);
    return {
        score: roleResult.score + prefResult.score,
        team1PositionPreferenceCount: prefResult.team1PositionPreferenceCount,
        team2PositionPreferenceCount: prefResult.team2PositionPreferenceCount,
        totalSRDifference:            roleResult.totalSRDifference,
        team1TotalSr:                 roleResult.team1TotalSr,
        team1AverageSr:               roleResult.team1AverageSr,
        team1TotalSrDistribution:     roleResult.team1TotalSrDistribution,
        team1TotalAverageSr:          roleResult.team1TotalAverageSr,
        team2TotalSr:                 roleResult.team2TotalSr,
        team2AverageSr:               roleResult.team2AverageSr,
        team2TotalSrDistribution:     roleResult.team2TotalSrDistribution,
        team2TotalAverageSr:          roleResult.team2TotalAverageSr,
    };
}

// Maps flat perm index to [team, position]
const PERM_SLOT_MAP: number[][] = [
    [1, 0], [1, 0],
    [1, 1], [1, 1],
    [1, 2], [1, 2],
    [2, 0], [2, 0],
    [2, 1], [2, 1],
    [2, 2], [2, 2],
];

function convertToResponse(perms: TopResult[], players: PostNewPlayerModelApi[]): string {
    const userList = perms.map(result =>
        Array.from(result.perm).map((playerIdx, slotIdx) => {
            const player = players[playerIdx];
            const team = PERM_SLOT_MAP[slotIdx][0];
            const position = PERM_SLOT_MAP[slotIdx][1];
            return {
                team,
                position,
                user: {
                    uuid: player.userId,
                    playerName: player.playerName,
                    tankPreference: player.tankPreference,
                    supportPreference: player.supportPreference,
                    dpsPreference: player.dpsPreference,
                    tankSr: player.tankSr,
                    supportSr: player.supportSr,
                    dpsSr: player.dpsSr,
                    names: player.names,
                },
            };
        })
    );

    const balancerMeta = perms.map(result => ({
        balanceScore:                  result.score,
        balanceTime:                   0,
        team1PositionPreferenceCount:  result.team1PositionPreferenceCount,
        team2PositionPreferenceCount:  result.team2PositionPreferenceCount,
        totalSRDifference:             result.totalSRDifference,
        team1TotalSr:                  result.team1TotalSr,
        team1AverageSr:                result.team1AverageSr,
        team1TotalSrDistribution:      result.team1TotalSrDistribution,
        team1TotalAverageSr:           result.team1TotalAverageSr,
        team2TotalSr:                  result.team2TotalSr,
        team2AverageSr:                result.team2AverageSr,
        team2TotalSrDistribution:      result.team2TotalSrDistribution,
        team2TotalAverageSr:           result.team2TotalAverageSr,
    }));

    return JSON.stringify({ version: "v1", userList, balancerMeta });
}

export function invertedUserList(userList: Array<BasicUserModelApi>): Array<BasicTagPlayerModelApi> {
    let iUserList = new Array<BasicTagPlayerModelApi>();
    userList.forEach((user) => {
        iUserList.push(new BasicTagPlayerModel(user.uuid, user.playerName, user.playerName));
        user.names.forEach((name) => {
            if (name.toUpperCase() !== user.playerName.toUpperCase()) {
                iUserList.push(new BasicTagPlayerModel(user.uuid, name, user.playerName));
            }
        });
    });
    iUserList.sort((a, b) => {
        return a.playerName.localeCompare(b.playerName);
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
            let user = users.find(tag => tag.uuid === player.user.uuid)
            tblRows.push(
                createData(
                    index,
                    player.getPositionName(),
                    user !== undefined ? user.names : player.user.name,
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

            setCurrentTable1Rows(createMainTableRows(balanceResponse, users, 1, value - 1));
            setCurrentTable2Rows(createMainTableRows(balanceResponse, users, 2, value - 1));

            setCurrentMeta1Rows(createMetaTableRows(balanceResponse, 1, value - 1));
            setCurrentMeta2Rows(createMetaTableRows(balanceResponse, 2, value - 1));
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

    function jsBalance() {
        const perms: Int8Array[] = props.permArray;
        const top: TopResult[] = [];

        const playerString = localStorage.getItem("players");
        let players: PostNewPlayerModelApi[] = [];
        if (playerString !== null) {
            players = JSON.parse(playerString) as PostNewPlayerModelApi[];
        }
        const sPlayers: PostNewPlayerModelApi[] = users.map(v => players.find(f => f.userId === v.uuid)!);

        for (let i = 0; i < perms.length; i++) {
            const perm = perms[i];
            const result = mbalance(perm, sPlayers);

            if (top.length < 5) {
                top.push({ perm, ...result });
                if (top.length === 5) {
                    top.sort((a, b) => a.score - b.score);
                }
            } else if (result.score > top[0].score) {
                top[0] = { perm, ...result };
                top.sort((a, b) => a.score - b.score);
            }
        }

        const sortedVals = top.sort((a, b) => b.score - a.score);
        const response: string = convertToResponse(sortedVals, sPlayers);
        console.log(JSON.parse(response))
        let balanceResponse = new BalanceResponseModel(response); // removed double JSON.stringify
        setResponse(balanceResponse);
    }

    return (
        <Container maxWidth="lg" className={classes.root}>
            <div className={classes.paper}>
                <Grid container spacing={1} justify="center">
                    <Grid item xs={12}>
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            options={invertedUserList(props.basicUserList)}
                            getOptionLabel={(option: BasicTagPlayerModelApi) => option.names}
                            groupBy={(option: BasicTagPlayerModelApi) => option.playerName}
                            value={users}
                            getOptionSelected={((option, value) => {
                                return BasicTagPlayerModel.equals(option, value)
                            })}
                            filterSelectedOptions={true}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label={`Selected Players (${numUsers})`}
                                    placeholder="Selected Players (need 12)"
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
                        <Button variant="contained" color="primary" fullWidth disabled={users.length !== 12} onClick={() => {
                            jsBalance()
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
            </div>
            <MetadataDrawer open={open} handleClose={toggleDrawer(false)} table1Rows={currentMeta1Rows}
                            table2Rows={currentMeta2Rows}/>
        </Container>
    );
}

export default withSnackbar(BalancerTab);